import React from 'react';
import { Router } from 'react-router-dom';

class NotAuthorized extends React.Component {
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
                <H1>You Are Not Authorized</H1>
        );
    }
}

export { NotAuthorized };
