import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { orderStatus, allowedStats } from './../../constants/orderStatus.constants'
import './Shipments.css'


class Bikers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bikerWillAssign: 'Choose a biker'
        }
    }
    componentDidMount() {
        
    }
    
    assignBiker(biker) {
        const { id, FirstName, LastName } = biker;
        this.setState({bikerWillAssign: `${FirstName} ${LastName}`}, this.props.bikerAssign(id))
    }

    renderBiker(bikers) {
        return(
            <UncontrolledDropdown>
                <DropdownToggle caret>
                    { this.state.bikerWillAssign }
                </DropdownToggle>
                <DropdownMenu>
                    {bikers.map((biker) => <DropdownItem key={biker.id} onClick={() => this.assignBiker(biker)}>{`${biker.FirstName} ${biker.LastName}`}</DropdownItem>)}
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }

    render() {
        return(
            <div>
                {this.props.bikers.items && this.renderBiker(this.props.bikers.items)}
            </div>
        )
    }
}

export { Bikers };