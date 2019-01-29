import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import InputMoment from 'input-moment';
import 'input-moment/dist/input-moment.css';
import './datePicker.css';

class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            m: moment()
        }
    }
    
    handleChange = m => {
      this.setState({ m });
      //console.log(this.state.m._d);
    };

    render() {

        return (
            <div>
                <InputMoment
                            moment={this.state.m}
                            onChange={this.handleChange}
                            minStep={5}
                            onSave={this.props.handleSave.bind(this, this.state.m.format('llll'))}
                            prevMonthIcon="ion-ios-arrow-left" // default
                            nextMonthIcon="ion-ios-arrow-right" // default
                        />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, shipments, bikers, alert  } = state;
    const { user } = authentication;
    return {
        user,
        shipments,
        bikers, 
        alert
    };
}

const connectedDatePicker = connect(mapStateToProps)(DatePicker);
export { connectedDatePicker as DatePicker };
