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

        let totalDaysLeft = days;
        let daysAvailable = true;

        do { // each iteration corresponds to one month

            let daysOfMonth = this.daysInMonth(currDate.getMonth() + 1, currDate.getFullYear()); // last day of month
            let dayOfMonth = currDate.getDate();

            // compute the days left according to current month, minus 1 to include initial day
            let daysLeftInMonth = Math.abs(daysOfMonth - (dayOfMonth - 1)); // 31 - 29 = 2

            let cm = {
                year: currDate.getFullYear(),
                month: currDate.getUTCMonth(), // from 0-11
                startDay: dayOfMonth,
                daysOfMonth: daysOfMonth,
                daysToRender: daysLeftInMonth // totalDaysLeft // days rendered for this month
            };

            // Verify if days are left
            if (totalDaysLeft > daysLeftInMonth) {
                totalDaysLeft -= daysLeftInMonth;
            } else {
                daysAvailable = false; // no more available days.
                cm.daysToRender = totalDaysLeft; // because daysLeft are less than month left
            }

            // complete the month information
            cm.monthTitle = this.getMonthName(cm.month);

            if (cm.weekRows === undefined) {
                cm.weekRows = [];
            }

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

            let currDay = 0;
            for (let j = 0; j < cm.daysToRender; j++) {

                if (!daysAvailable) {
                    // If no more available days for more months, we start to decrease daysLeft
                    totalDaysLeft--;
                }

                currDay = cm.startDay + j;
                let newDay = this.createDay(currDate, currDay, false);
                daysArr.push(newDay);


                let weekDone = false;
                if (newDay.dayInWeek === DAY_NAMES.Saturday) {
                    // go to next row if:
                        // day is the last of week (saturday)
                        // current day is last of month or last of week
                        // no more days are available, no more rows are needed
                    let newDaysArr = daysArr.map((d) => {return d});
                    // complete empty days of week
                    newDaysArr = this.completeInvalidDays(newDaysArr, currDate, currDay);
                    cm.weekRows.push(newDaysArr);
                    daysArr = [];
                    weekDone = true;
                }

                // complete empty days of week
                // if current day is last of month or last of week and no more days are available, no more rows are needed
                if (currDay === cm.daysOfMonth || totalDaysLeft <= 0) {
                // if (currDay === cm.daysOfMonth) {
                    if (!weekDone) {
                        let newDaysArr = daysArr.map((d) => {return d});
                        // complete empty days of week
                        newDaysArr = this.completeInvalidDays(newDaysArr, currDate, currDay);
                        cm.weekRows.push(newDaysArr);
                        daysArr = [];
                    }
                    if (currDay === cm.daysOfMonth) {
                        // break only if it is the last day of month
                        // TODO: complete invalid days week if necessary
                        break;
                    }
                }
            }

            if (!cm.weekRows.length && daysArr.length) {
                // No week was completed, must to create one
                let newDaysArr = daysArr.map((d) => {return d});
                // complete empty days of week
                newDaysArr = this.completeInvalidDays(newDaysArr, currDate, currDay);
                cm.weekRows.push(newDaysArr);
                daysArr = [];
            }

            calendarMonths.push(cm);

            // increase the date to next month starting from first day
            currDate = new Date(currDate.getFullYear(), currDate.getUTCMonth() + 1, 1);
        }
        while (totalDaysLeft > 0 && daysAvailable);

        console.log(calendarMonths);

        return calendarMonths;
    },

    completeInvalidDays(daysArr, currDate, day) {

        // verify if need to complete invalid days in week
        let tempCurrDate = new Date(currDate.getFullYear(), currDate.getUTCMonth(), day);
        let emptyDays = DAY_NAMES.Saturday - tempCurrDate.getDay();
        // complete array with empty/invalid days (if required)
        if (emptyDays > 0) {
            //let startDay = day > emptyDays ? (cm.startDay - emptyDays) : 0;
            for (let i = 0; i < emptyDays; i++) {

                let newDay = this.createDay(currDate, emptyDays + i, true);
                daysArr.push(newDay);
            }
        }

        return daysArr;

    }
};

export default utils;