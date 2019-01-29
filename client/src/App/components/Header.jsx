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
import './../../assets/style/components/header.less';
import { HypeImgs } from './../../constants/_temperrory.constants';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
      // localImgs: {
      //     avatar: {
      //         admin: "./../../assets/images/saloodo-avatar.png",
      //         biker: "./../../assets/images/biker-avatar.jpg",
      //     }
      // }
    };
  }

  logOut() {
    this.props.dispatch(userActions.logout());
    history.push('/login');
  }

  renderImgDep(isAdmin, imgsSrc) { // temp function
    let finalImg = "";
    if (isAdmin) { // Admin role
        finalImg = imgsSrc.avatar.admin;
    } else { // Biker role
        finalImg = imgsSrc.avatar.biker;
    }
    return finalImg;
  }

  renderImgs(isAdmin = true, shouldHyper) { // temp function
      if (shouldHyper) { // Should Get images from HyperLink
          return this.renderImgDep(isAdmin, HypeImgs);
      }
      // else {
          // return this.renderImgDep(isAdmin, this.state.localImgs);
      // }

  }

  renderUserDetail(user) {
    return (
      <UncontrolledDropdown nav inNavbar className="user-profile">
        <DropdownToggle nav caret>
          {user.email}
        </DropdownToggle>
        <DropdownMenu right>
            <Card>
              <CardImg top width="100%" style={{ maxWidth: "160px", margin: "0 auto" }} src={this.renderImgs(user.role === "admin", true)} alt="Card image cap" />
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