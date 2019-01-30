import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactPaginate from 'react-paginate';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import './../../assets/style/components/shipments.less';
import { orderStatus, allowedStats } from './../../constants/orderStatus.constants';
// import './Shipments.css';

import { userActions } from '../../actions';

class Shipments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          perPage: 5,
          data: [],
          offset: 1,
          selectedRow: null
        };
    }

    componentDidMount() {
        if(this.props.wantPaging){
            this.dispatchPage(this.state.perPage, this.state.offset);
        }
    }

    dispatchPage(limit, page) {
        this.props.dispatch(this.props.loadShipmentsFromServer(limit, page)).then((data) => 
            this.setState({
                data: data.items,
                pageCount: Math.ceil(data.meta.totalCount / data.meta.limit),
            })
        );
    }

    renderHeaders(headers, ix) {
        let domHeads = []; 
        if (headers && headers.length > 0) {
            headers.forEach((head, ix) => domHeads.push(<Th key={ix}>{head}</Th>));
        }
        return <Tr>{domHeads}</Tr>;
    }

    handlePageClick = data => {
        //const selected = data.selected,
        const offset = data.selected + 1;//Math.ceil(selected * this.state.perPage);
    
        this.setState({ offset: offset }, () => {
            this.dispatchPage(this.state.perPage, this.state.offset);
        });
    };

    renderOrderStatus(item) {
        const _fieldToChange = 'orderStatus';
        return (
            <UncontrolledDropdown>
            <DropdownToggle caret>
                {orderStatus[item[_fieldToChange]]}
            </DropdownToggle>
            <DropdownMenu>
                { orderStatus.map((dropStat, ix) => {
                    const { role } = this.props.user;
                    if (ix === 0 && role === 'biker') {
                        return;
                    } else if([2, 3].indexOf(ix) > -1 && !this.props.wantPaging && role === 'admin') {
                        return;
                    } else {
                        // ....
                    }

                    return <DropdownItem key={ix} active={ix === item[_fieldToChange]} onClick={(e) => this.props.changeField(e ,item, _fieldToChange)}>{dropStat}</DropdownItem>;
                }) }
                { !this.props.wantPaging && <DropdownItem key="4" style={{color: 'red'}} onClick={ (e) => this.props.dispatch(this.props.removeField(false, item)) }>Remove</DropdownItem>}
            </DropdownMenu>
            </UncontrolledDropdown>
        );
    }

    renderColumn(row) {
        let domCols = [];
        if (row) {
            this.props.headers.forEach((head) => {
                domCols.push(<Td key="col">{ 
                    head === "orderStatus" 
                        ? this.renderOrderStatus(row)
                        : (head === "BikerId" && row[head] === null 
                            ? "No One"
                            : row[head]
                          )
                    }</Td>)
            });
        }
        return <Tr 
                    key={row.id} 
                    onClick={ this.changeSelectedsRows.bind(this, row.id) }
                    className={ (this.state.selectedRow === row.id ? 'selected' : '') }
                    >
                     {domCols}
                </Tr>;
    }

    changeSelectedsRows(rId){
        if (this.state.selectedRow !== rId) {
            this.setState({ selectedRow: rId });
        }
    }
    
    renderRows(rows) {
        let domRows = [];
        if (rows && rows.length > 0) {
            rows.forEach((row, ix) => domRows.push(this.renderColumn(row)));
        }
        return domRows;
    }


    renderTable(isReady) {
        if (isReady) {
            return (
                <div className="shipments-container">
                    <Table>
                            <Thead>
                                {this.renderHeaders(this.props.headers)}
                            </Thead>
                            <Tbody>
                                {this.renderRows(this.props.rows)}
                            </Tbody>
                    </Table>
                    
                    
                    {this.props.wantPaging && <ReactPaginate
                        previousLabel={<FontAwesomeIcon icon="chevron-left" />}
                        nextLabel={<FontAwesomeIcon icon="chevron-right" />}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                        pageClassName={'page'}
                    />}
                </div>
            );
        } else {
            return <p style={{minHeight: '210px'}}> No parcel changed yet </p>
        }
    }

    render() {
       return this.renderTable(this.props.isReady);
    }
}

export { Shipments };