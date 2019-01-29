import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { shipmentActions, bikerActions, alertActions } from './../../actions';
import { Shipments, DatePicker } from './../components';
import { orderStatus } from './../../constants/orderStatus.constants';


class BikerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          shipmentItem: null,
          submitBtns: (<div style={styles.submitBtns}>
                            <Button color="primary" onClick={() => this.buttonPerSitu(true)}>Submit</Button>
                      </div>)
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }

    buttonPerSitu(isSubmit) {
        let retBtns = <div>is Loading...</div>;
        if (isSubmit) {
            retBtns = (<div style={styles.submitBtns}>
                          <span style={{alignSelf: 'left'}}>Are you sure ? </span>
                          <Button color="primary" onClick={() => this.submitChanges()}>Yes</Button>
                          <Button color="primary" onClick={() => this.buttonPerSitu(false)}>No</Button>
            </div>);
        } else {
            retBtns = (<div style={styles.submitBtns}>
                          <Button color="primary" onClick={() => this.buttonPerSitu(true)}>Submit</Button>
            </div>);
        }
        this.setState({ submitBtns : retBtns});
    }
    
    addToChangedItems({ currentTarget }, item, _fieldToChange) {
        const changedStatus = orderStatus.indexOf(currentTarget.textContent);
        if (changedStatus !== item.orderStatus) {
            if(item.orderStatus !== 3) { // if order is not in DELIVERED
                if (changedStatus === 1) { // ordeStatus is ASSIGNED
                    let inChangedItem = { ...item, [_fieldToChange]: 1 };
                    if(item.PickedUpTime) {
                        inChangedItem = { ...inChangedItem, PickedUpTime: null };
                    }
                    this.props.dispatch(shipmentActions.changeField(inChangedItem)); // order goes to ASSIGNE mode
                } else { // ordeStatus is PICKED_UP or DELIVERED
                    this.setState({ shipmentItem: { ...item, [_fieldToChange]: orderStatus.indexOf(currentTarget.textContent)} },this.toggle());   
                }                
            }
        }
    }

    handleSave(timeStampVal) {
        const _timestampKey =  `${this.state.shipmentItem.orderStatus === 2 ? 'PickedUp': 'Delivered' }Time`; // PickUpTime or DeliveredTime
        if(!this.props.shipments.changedItems.some(itm => itm.id === this.state.shipmentItem.id)) {
            this.props.dispatch(shipmentActions.setChangedItem(true,
                {
                    ...this.state.shipmentItem,
                    [_timestampKey]: timeStampVal
                }
            ));
            
        } else {
            this.props.dispatch(shipmentActions.changeField(
                {
                    ...this.state.shipmentItem,
                    [_timestampKey]: timeStampVal
                }
            ));
        }
        this.toggle();
    };

    submitChanges() {
        this.props.dispatch(shipmentActions.updateShipments(this.props.shipments.changedItems))
            .then(() => {
                this.buttonPerSitu(false)
                //this.toggle();
            })
    }

    render() {
        const { user, shipments, bikers, alert } = this.props;
        let originHeaders = [], changedHeaders = [], originShipRows = [], changedShipRows = [];

        if(shipments.items.length > 0) {
            const shipmsFirstItem = shipments.items[0],
                changedShipsFirstItem = shipments.changedItems.length > 0 ? shipments.changedItems[0] : shipmsFirstItem;
            originHeaders = Object.keys(shipmsFirstItem);
            changedHeaders = Object.keys(changedShipsFirstItem);
            originShipRows = shipments.items;
            changedShipRows = shipments.changedItems;
        }

        const { container, header } = styles;
        return (
            
            <div className="biker-container" style={container}>
                <h4 style={header} className="cust-title">Shipments assigned to you</h4>
                <Shipments 
                    headers={originHeaders} 
                    rows={originShipRows}
                    isReady={originShipRows.length > 0}
                    dispatch={this.props.dispatch.bind(this)}
                    user={this.props.user}
                    changeField={this.addToChangedItems.bind(this)}
                    loadShipmentsFromServer={shipmentActions.getBikerShipmentsPage.bind(this)}
                    wantPaging
                />
                <h4 style={{...header, marginTop: '25px'}} className="cust-title">changed Shipments</h4>
                <Shipments 
                    headers={changedHeaders} 
                    rows={changedShipRows}
                    isReady={changedShipRows.length > 0}
                    user={this.props.user}
                    dispatch={this.props.dispatch.bind(this)} 
                    changeField={this.addToChangedItems.bind(this)}
                    loadShipmentsFromServer={shipments.changedItems}
                    removeField={shipmentActions.setChangedItem.bind(this)}
                />
                {this.state.submitBtns}
                <div className="Modal-container">  
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>
                            Set Timestamp for parcel
                        </ModalHeader>
                        <ModalBody style={{textAlign: 'center'}}>
                           <DatePicker handleSave={this.handleSave.bind(this)} />            
                        </ModalBody>
                    </Modal>
                </div>
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, shipments, bikers, alert  } = state;
    const { user } = authentication;
    return {
        user,
        shipments,
        bikers, 
        alert
    };
}

const styles = {
    container: {
        padding: '20px 25px'
    },
    header: {
        marginBottom: '25px'
    },
    submitBtns: {
        marginTop: '15px'
    }
}

const connectedBikerPage = connect(mapStateToProps)(BikerPage);
export { connectedBikerPage as BikerPage };
