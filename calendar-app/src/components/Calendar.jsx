import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './calendar.css';

class Calendar extends Component {

    constructor(props) {
        super(props);

        // initial date
        let defaultDate = this.getDateValue(new Date());

        this.state = {
            startDate: defaultDate,
            days: 15,
            code: ''
        };

        //this.updateDays = this.updateDays.bind(this);
    }

    static defaultProps = {
    };

    static propTypes = {
    };

    componentDidMount() {
    }

    getDateValue(date) {

        if (!date) {
            return '';
        }

        let dtValue = date.toISOString().substring(0, 10);
        return dtValue;
    }

    updateDays(e) {
        // Update the days on state
        this.setState({days: e.target.value});
    }

    updateTextField(propName, e) {
        // Generic function to update the state values according to propName
        let newState = Object.assign({}, this.state);
        newState[propName] = e.target.value;
        this.setState(newState);
    }

    updateDate(e) {
        this.setState({startDate: e.target.value});
    }

    // TODO: optionally, parse date from user input string 'mm/dd/yyyy'



    render() {

        let startDateValue = new Date(this.state.startDate).toLocaleDateString();
        console.log(this.state.startDate);
        console.log(startDateValue);

        return <div>
            <h1>Calendar Component</h1>
            <div className="input-container">
                <label className="left-label">{'Start Date:'}</label>
                <input type="date" value={this.state.startDate} onChange={(e)=> this.updateDate(e)} />
            </div>
            <div className="input-container">
                <label className="left-label">{'Number of days:'}</label>
                <input type="text" value={this.state.days} onChange={(e)=> this.updateTextField('days', e)} />
            </div>
            <div className="input-container">
                <label className="left-label">{'Country Code:'}</label>
                <input type="text" value={this.state.code} onChange={(e)=> this.updateTextField('code', e)} />
            </div>

            <h2>Data selected</h2>
            <div>Date {startDateValue}</div>
            <div>Days {this.state.days}</div>
            <div>Code {this.state.code}</div>

        </div>
    }
}

export default Calendar;