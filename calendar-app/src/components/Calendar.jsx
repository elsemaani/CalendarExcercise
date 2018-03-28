import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './calendar.css';

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            days: 15,
            country: ''
        }
    }

    static defaultProps = {
    };

    static propTypes = {
    };

    componentDidMount() {
    }

    render() {

        return <div>
            <h1>Calendar Component</h1>
            <div className="input-container">
                <div className="left-label">{'Start Date:'}</div>
                <input type="date" value={this.state.date} />
            </div>
            <div className="input-container">
                <div className="left-label">{'Number of days:'}</div>
                <input type="text" value={this.state.days} />
            </div>
            <div className="input-container">
                <div className="left-label">{'Country Code:'}</div>
                <input type="text" value={this.state.country} />
            </div>
        </div>
    }
}

export default Calendar;