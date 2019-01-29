import React from 'react';
import { Router } from 'react-router-dom';

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
                <H1>This is Home Page</H1>
        );
    }
}

export { AppContainer };
