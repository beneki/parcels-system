import React from 'react';
import { history } from '../../helpers';
import { Button } from 'reactstrap';

class NotFound extends React.Component {
    redirectTo(page) {
        if(page === 'login') {
            history.push('/login');
        }
        
    }

    render() {
        return (
            <div style={{textAlign: 'center', marginTop: '2em'}}>
                <h1 style={{marginBottom: '1em'}}>Page Not Found</h1>
                <Button onClick={() => this.redirectTo('login')}> Go to login page</Button>
            </div>
        );
    }

}

export { NotFound };
