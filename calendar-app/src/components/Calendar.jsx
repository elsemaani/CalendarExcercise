import React, { Component } from 'react';
import utils from '../utils.jsx';
import WeekBox from './WeekBox.jsx';
import './calendar.css';

class Calendar extends Component {

    constructor(props) {
        super(props);

        // initial date
        let defaultDate = utils.getISODateValue(utils.getUtcDate());

        this.state = {
            startDate: defaultDate,
            days: 15,
            code: 'US'
        };

        //this.updateDays = this.updateDays.bind(this);
    }

    componentDidMount() {
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

        let startDate = utils.getDateFromStr(this.state.startDate);
        let localDateValue = startDate.toLocaleDateString(this.state.code); // new Date(Date.UTC(locDate.getFullYear(), locDate.getUTCMonth(), locDate.getDate()));

        console.log('Input date:', this.state.startDate);
        console.log('Date obj:', startDate);
        console.log('Local date:', localDateValue);

        return <div className="calendar-root">
            <h2>Calendar - Jean Paul El Semaani</h2>
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

            {/* Controls to verify input data*/}
            {/*<h2>Data selected</h2>*/}
            {/*<div>Date {localDateValue}</div>*/}
            {/*<div>Days {this.state.days}</div>*/}
            {/*<div>Code {this.state.code}</div>*/}

            <WeekBox weekFormat={'ss'} days={parseInt(this.state.days)} startDate={this.state.startDate}/>

        </div>
    }
}

export default Calendar;