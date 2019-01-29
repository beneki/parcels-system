import React  from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {  Header, Footer } from './'
import './../../assets/style/global/global.less';
import { Alert } from 'reactstrap'

class Container extends React.Component {
  renderAlert(alert) {
    window.scrollTo(0, 0);
    return <Alert color={alert.type}> {alert.message} </Alert>;
  }

  render() {
    const { user, alert, dispatch } = this.props;
    return (
      <div>
          <Header user={user} dispatch={dispatch} />
                { alert.type && this.renderAlert(alert) }
                <div style={{marginTop: '3em'}}>
                  {this.props.children}
                </div>
          <Footer role={user.role} />
      </div>
    );
  }
  
}

function mapStateToProps(state) {
  const { authentication, alert } = state;
  const { user } = authentication;
  return {
    user,
    alert
  };
}

const connectedContainer = connect(mapStateToProps)(Container);
export { connectedContainer as Container };
