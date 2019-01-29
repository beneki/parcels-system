import React from 'react';
import { Router } from 'react-router-dom';

class NotFound extends React.Component {
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
                <H1>Page Not Found</H1>
        );
    }
}

export { NotFound };
