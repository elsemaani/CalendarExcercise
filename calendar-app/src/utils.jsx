const MONTHS = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const DAY_NAMES = {Sunday: 0,Monday:1,Tuesday:2,Wednesday:3,Thursday:4,Friday:5,Saturday:6};

let utils = {

    getMonthName(month) {
        return MONTHS[month];
    },

    getDateValue(date) {

        if (!date) {
            return '';
        }

        let dtValue = date.toISOString().substring(0, 10);
        return dtValue;
    },

    daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    },

    getCalendarMonths(startDate, days) {

        let currDate = new Date(startDate);

        console.log('From', startDate);
        console.log('Days', days);

        // must to render the necessary months
        let calendarMonths = [];

        let daysLeft = days;
        let stillDays = true;

        do { // each iteration corresponds to one month

            let daysOfMonth = this.daysInMonth(currDate.getUTCMonth() + 1, currDate.getFullYear()); // last day of month
            let dayOfMonth = currDate.getDate();

            // compute the days left according to current month
            let daysLeftInMonth = Math.abs(daysOfMonth - dayOfMonth); // 31 - 365 = 334

            // Verify if are days left
            if (daysLeft >= daysLeftInMonth) {
                daysLeft -= daysLeftInMonth;
            } else {
                stillDays = false; // no more available days.
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
            let daysArr = []; // week row days
            for (let i = 0, j = cm.startDay; i < cm.daysToRender; i++) {

                let currDay = j+i; // render the day according to starting day
                let tempDate = new Date(currDate.getFullYear(), currDate.getUTCMonth(), currDay);

                daysArr.push(j+i);

                if (tempDate.getDay() === DAY_NAMES.Saturday) {
                    // If day is the last of week (saturday) go to next row of week

                    cm.weekRows.push(daysArr);
                }

                // TODO: currDay is not reaching the last day of month
                if (currDay === cm.daysOfMonth) {
                    // if current day is last of month, no mor rows are needed for this month
                    break;
                }
            }

            calendarMonths.push(cm);

            // increase the date to next month starting from first day
            currDate = new Date(currDate.getFullYear(), currDate.getUTCMonth() + 1, 1);

            //console.log('Month', currDate.getMonth());
            //console.log(daysLeft);
        }
        while (daysLeft > 0 && stillDays);

        console.log(calendarMonths);

        return calendarMonths;
    }
};

export default utils;