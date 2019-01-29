import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { shipmentActions, bikerActions } from './../../actions';
import { Shipments, Bikers } from './../components';
import { orderStatus } from './../../constants/orderStatus.constants';

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          modalButtons: <ModalFooter>
                            <Button color="primary" onClick={() => this.buttonPerSitu(true)}>Submit</Button>
                            <Button color="primary" onClick={this.toggle.bind(this)}>Close</Button>
                        </ModalFooter>
        };

        this.toggle = this.toggle.bind(this);
    }


    toggle() {
        if(!this.state.modal) {
            this.props.dispatch(bikerActions.getAll());
        }
        this.setState({
          modal: !this.state.modal
        });
    }

    setShipmentsABiker(bikerId) {
        this.props.dispatch(shipmentActions.setShipmentsABiker(bikerId));
    }

    bikerSpinner() {
        const { bikers, shipments }  = this.props;
        
        if(shipments.changedItems.some(itm => itm.orderStatus !== 0)) { 
            if(bikers.items.length > 0) {
                return <Bikers bikers={this.props.bikers} bikerAssign={this.setShipmentsABiker.bind(this)} />;
            } else {
                return <div>Bikers are loading</div>;
            }
        } else {
            return <div>No assigned item exists, just submit changes</div>;
        }
        return <div>is Loading....</div>;
    }

    buttonPerSitu(isSubmit) {
        let retBtns = <div>is Loading...</div>;
        if (isSubmit) {
            retBtns = <ModalFooter>
                          <span style={{alignSelf: 'left'}}>Are you sure ? </span>
                          <Button color="primary" onClick={() => this.submitChanges()}>Yes</Button>
                          <Button color="primary" onClick={() => this.buttonPerSitu(false)}>No</Button>
                       </ModalFooter>;
        } else {
            retBtns = <ModalFooter>
                          <Button color="primary" onClick={() => this.buttonPerSitu(true)}>Submit</Button>
                          <Button color="primary" onClick={this.toggle}>Close</Button>
                      </ModalFooter>;
        }
        this.setState({ modalButtons : retBtns});
    }

    submitChanges() {
        const { shipments, dispatch } = this.props,
            { changedItems } = shipments;

        if (changedItems.length > 0) {
            const { updateShipments, clearChangedItems } = shipmentActions;
            dispatch(updateShipments(changedItems))
                .then(() => {
                    this.toggle();
                    dispatch(clearChangedItems());
                });
        }
    }



    addToChangedItems({ currentTarget }, item, _fieldToChange) { // change orderStatus of the shipments
        const changedStatus = orderStatus.indexOf(currentTarget.textContent);
        if (changedStatus !== item.orderStatus) {
            if ([2, 3].indexOf(changedStatus) === -1) { // the orderStatus is not PICKED_UP or DELIVERED
                if (!this.props.shipments.changedItems.some(itm => itm.id === item.id)) {
                    this.props.dispatch(shipmentActions.setChangedItem(true, {...item, BikerId: null , [_fieldToChange]: orderStatus.indexOf(currentTarget.textContent)}));
                }
            }
        }
    }

    changeOrderStatus({ currentTarget }, item, _fieldToChange) {
        this.props.dispatch(shipmentActions.changeField({ ...item, [_fieldToChange]: orderStatus.indexOf(currentTarget.textContent) }));
    }


    render() {
        const { user, shipments, bikers, alert } = this.props;
        let shipsHeaders = [], shipRows = [], shipmentsWillAssign = [];

        if(shipments.items.length > 0) {
            const shipmsFirstItem = shipments.items[0];
            shipsHeaders = Object.keys(shipmsFirstItem);
            shipRows = shipments.items;
            shipmentsWillAssign = shipments.shipmentsWillAssign || [];
        }
        const { container, header } = styles;
        return (
            <div className="admin-container" style={container}>
                <h4 style={header} className="cust-title">All Shipments</h4>
                <Shipments 
                    headers={shipsHeaders} 
                    rows={shipRows}
                    isReady={shipRows.length > 0}
                    user={this.props.user}
                    dispatch={this.props.dispatch.bind(this)} 
                    changeField={this.addToChangedItems.bind(this)}
                    loadShipmentsFromServer={shipmentActions.getPage.bind(this)}
                    wantPaging
                />

                <h4 style={{...header, marginTop: '25px'}} className="cust-title">changed Shipments</h4>    
                <Shipments 
                    headers={shipsHeaders} 
                    rows={shipments.changedItems}
                    isReady={shipRows.length > 0}
                    user={this.props.user}
                    dispatch={this.props.dispatch.bind(this)} 
                    changeField={this.changeOrderStatus.bind(this)}
                    loadShipmentsFromServer={shipments.changedItems}
                    removeField={shipmentActions.setChangedItem.bind(this)}
                />
                <Button style={{marginTop: '15px'}} color="primary" onClick={this.toggle}>Submit Changes</Button>
                {this.state.modal && <div className="Modal-container">  
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>

                            Choose a biker
                        </ModalHeader>
                        <ModalBody>
                            { this.bikerSpinner() }

                        </ModalBody>
                        {this.state.modalButtons}
                    </Modal>
                </div> }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, shipments, bikers  } = state;
    const { user } = authentication;
    return {
        user,
        shipments,
        bikers
    };
}

const styles = {
    bikerContainer: {
        padding: '20px 25px'
    },
    header: {
        marginBottom: '25px'
    }
}

const connectedAdminPage = connect(mapStateToProps)(AdminPage);
export { connectedAdminPage as AdminPage };
