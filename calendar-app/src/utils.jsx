const MONTHS = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const DAY_NAMES = {Sunday: 0,Monday:1,Tuesday:2,Wednesday:3,Thursday:4,Friday:5,Saturday:6};

let utils = {

    getDayDate(date, day) {
        return new Date(date.getFullYear(), date.getUTCMonth(), day);
    },

    getMonthName(month) {
        return MONTHS[month];
    },

    getUtcDate(date) {

        if (!date) {
            date = new Date();
        }
        let utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        return utcDate;
    },

    getDateFromStr(strDate) {

        let dateParts = strDate.split('-');
        let utcDate = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
        return utcDate;
    },

    getDateValue(date) {

        if (!date) {
            return '';
        }

        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
            month = `0${month}`;
        }
        if (day < 10) {
            day = `0${day}`;
        }
        let dtValue = `${month}-${day}-${date.getFullYear()}`;

        return dtValue;
    },

    getISODateValue(date) {

        if (!date) {
            return '';
        }

        let dtValue = date.toISOString().substring(0, 10);
        return dtValue;
    },

    daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    },

    isWeekend(date) {
        let day = date.getDay();
        if (day === DAY_NAMES.Sunday || date.getDay() === DAY_NAMES.Saturday) {
            return true;
        }
        return false;
    },

    createDay(date, day, invalid) {

        let tempCurrDate = this.getDayDate(date, day);
        let weekend = this.isWeekend(tempCurrDate);

        return {
            dayInWeek: tempCurrDate.getDay(), // 0,1,2,3,4,5,6
            day: day,
            invalid: invalid,
            weekend: weekend
        };
    },

    // create an object with data computed to render each month with corresponding weeks and days
    getCalendarMonths(startDate, days) {

        let currDate = utils.getDateFromStr(startDate);

        // must to render the necessary months
        let calendarMonths = [];

        let daysLeft = days;
        let daysAvailable = true;

        do { // each iteration corresponds to one month

            let daysOfMonth = this.daysInMonth(currDate.getMonth() + 1, currDate.getFullYear()); // last day of month
            let dayOfMonth = currDate.getDate();

            // compute the days left according to current month
            let daysLeftInMonth = Math.abs(daysOfMonth - dayOfMonth); // 31 - 365 = 334

            // Verify if days are left
            if (daysLeft >= daysLeftInMonth) {
                daysLeft -= daysLeftInMonth;
            } else {
                daysAvailable = false; // no more available days.
            };

            let cm = {
                year: currDate.getFullYear(),
                month: currDate.getUTCMonth(), // from 0-11
                startDay: dayOfMonth,
                daysOfMonth: daysOfMonth,
                daysToRender: daysLeft,
            };

            // complete the month information
            cm.monthTitle = this.getMonthName(cm.month);

            if (cm.weekRows === undefined) {
                cm.weekRows = [];
            }
            cm.weekRows.push()
            let daysArr = []; // week row days

            let tempCurrDate = new Date(currDate.getFullYear(), currDate.getUTCMonth(), cm.startDay);
            let prevEmptyDays = tempCurrDate.getDay() - DAY_NAMES.Sunday;
            // initialize array with empty/invalid days (if required)
            if (prevEmptyDays > 0) {
                let startDay = cm.startDay > prevEmptyDays ? (cm.startDay - prevEmptyDays) : 0;
                for (let i = 0; i < prevEmptyDays; i++) {

                    let newDay = this.createDay(currDate, startDay + i, true);
                    daysArr.push(newDay);
                }
            }

            for (let i = 0; i < cm.daysToRender; i++) {

                if (!daysAvailable) {
                    // If no mor available days for more months, we start to decrease daysLeft
                    daysLeft--;
                }

                let currDay = cm.startDay + i;
                let newDay = this.createDay(currDate, currDay, false);
                daysArr.push(newDay);

                if (newDay.dayInWeek === DAY_NAMES.Saturday) {
                    // If day is the last of week (saturday) go to next row of week and initialize array
                    let newDaysArr = daysArr.map((d) => {return d});
                    cm.weekRows.push(newDaysArr);
                    daysArr = [];
                }

                // complete empty days of week
                // if current day is last of month or last of week and no more days are available, no more rows are needed
                if (currDay === cm.daysOfMonth || daysLeft <= 0) {
                    break;
                }
            }

            calendarMonths.push(cm);

            // increase the date to next month starting from first day
            currDate = new Date(currDate.getFullYear(), currDate.getUTCMonth() + 1, 1);
        }
        while (daysLeft > 0 && daysAvailable);

        console.log(calendarMonths);

        return calendarMonths;
    }
};

export default utils;