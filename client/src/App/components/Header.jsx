import React from 'react';
import { history } from '../../helpers';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card, 
  CardImg, 
  CardText, 
  CardBody,
  CardTitle, 
  CardSubtitle, 
  Button } from 'reactstrap';
import { userActions } from '../../actions';
import './../../assets/style/components/header.less'
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  logOut() {
    this.props.dispatch(userActions.logout());
    history.push('/login');
  }

  renderUserDetail(user) {
    return (
      <UncontrolledDropdown nav inNavbar className="user-profile">
        <DropdownToggle nav caret>
          {user.email}
        </DropdownToggle>
        <DropdownMenu right>
            <Card>
              <CardImg top width="100%" src={require(user.role === "admin"? "./../../assets/images/saloodo-avatar.png": "./../../assets/images/biker-avatar.jpg")} alt="Card image cap" />
              <CardBody>
                <CardTitle>{user.firstName + ' ' + user.lastName}</CardTitle>
                <CardText>{user.role === 'admin' ? 'You are an admin': 'You are a Biker'}</CardText>
                <CardText></CardText>
                <Button style={{marginTop: '10px'}} onClick={() => this.logOut()}>Logout</Button>
              </CardBody>
            </Card>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Welcome</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
                {this.props.user && this.renderUserDetail(this.props.user)}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export { Header };