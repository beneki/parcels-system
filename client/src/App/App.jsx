import React from 'react';
import { Router, Route, Rrdirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from './../helpers';
import { alertActions } from './../actions';
import { PrivateRoute } from './components';
import { AppContainer } from './';
import { AdminPage, BikerPage } from './Authorized';
import { NotFound, NotAuthorized } from './Handlers';
import { LoginPage } from './Login/LoginPage';
import './../assets/style/global/global.less';

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.dispatch(alertActions.clear());
        });
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <Switch>
                        <Route path="/" exact component={LoginPage} />
                        <Route path="/login" component={LoginPage} />
                        <PrivateRoute exact path="/admin" role={['admin']} component={AdminPage} />
                        <PrivateRoute exact path="/biker" role={['biker']} component={BikerPage} />
                        <Route path="/not-authorized" exact component={NotAuthorized} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

const connectedApp = connect(null)(App);
export { connectedApp as App };
