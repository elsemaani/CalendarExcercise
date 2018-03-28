import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './calendar.css';

// Array for header days
const DAYS = ['S','M','T','W','T','F','S'];

class WeekBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    static defaultProps = {
        weekFormat: 'ss' // property to eventually allow different calendar styles: ss (sunday to saturday), ms (monday to saturday);
    };

    static propTypes = {
        weekFormat: PropTypes.string.isRequired,
        startDate: PropTypes.object.isRequired,
        days: PropTypes.number.isRequired
    };

    componentDidMount() {
    }

    getHeaderDays() {
        return (DAYS.map((d, index)=> {
            return <div id={index} className="header-day">{d}</div>;
        }))
    }

    render() {

        let headerDays = this.getHeaderDays();

        return <div className="weekbox-root">
            <div className="header-days-container">
                {headerDays}
            </div>
        </div>
    }
}

export default WeekBox;