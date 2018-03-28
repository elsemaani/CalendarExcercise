import React, { Component } from 'react';
import PropTypes from 'prop-types';
import utils from '../utils.jsx';
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
        startDate: PropTypes.string.isRequired,
        days: PropTypes.number.isRequired
    };

    componentDidMount() {
    }

    renderMonth(days) {

    }

    getHeaderDays() {
        return (DAYS.map((d, index)=> {
            return <div key={index} className="header-day">{d}</div>;
        }))
    }

    getCalendarDays(calendarMonths) {

        if (!calendarMonths) {
            return;
        }

        // year, month, startDay, daysOfMonth, daysToRender
        let result = calendarMonths.map((cm) => {

            let rows = cm.weekRows && cm.weekRows.map((daysArr, rIndex) => {

                let fields = daysArr && daysArr.map((day, fIndex) => {
                    return <div key={fIndex} className="day">{day}</div>;
                });

                return (<div key={rIndex} className="days-row">
                    {fields}
                </div>)
            })

            return (
                <div>
                    <div>{cm.monthTitle}</div>
                    {rows}
                </div>
            )
        });

        return result;
    }

    render() {

        let headerDays = this.getHeaderDays();

        let calendarMonths = utils.getCalendarMonths(this.props.startDate, this.props.days);

        let calendarDays = this.getCalendarDays(calendarMonths);

        return <div className="weekbox-root">
            <div className="header-days-container">
                {headerDays}
            </div>
            <div>
                {calendarDays}
            </div>
        </div>
    }
}

export default WeekBox;