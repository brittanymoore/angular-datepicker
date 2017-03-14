/*
 * myCalendar
 * Represents a calendar instance, with one date selected.
 */

import { myDate } from './date.class';
import { myCalendarCell } from './calendar-cell.class';

export class myCalendar {

    /* public properties */
    public dates: any[]; // array of 'week' objects containing calendarCell objects.

    /* private properties */
    private viewDate: myDate; // month-year representation of currently displayed date
    private selectedDate: myDate; // currently selected date

    /* constructor */
    constructor(date?: myDate) { 
        // If no date is provided, default to today's date.
        if (!date) {
            let today = new Date(Date.now());
            this.viewDate = new myDate(today.getFullYear(), today.getMonth(), today.getDate());
            this.setSelectedDate(this.viewDate);
        } else {
            this.viewDate = date;
            this.setSelectedDate(this.viewDate);
        }
    }

    /* public methods */

    // Set the currently selected date.
    public setSelectedDate(val: myDate): void {
        this.viewDate = new myDate(val.year, val.month);
        this.selectedDate = val;
        this.render();
    }

    // Increment month by one.
    public nextMonth(): void {
        this.viewDate.shiftMonth(1);
        this.render();
    }

    // Decrement month by one.
    public prevMonth(): void {
        this.viewDate.shiftMonth(-1);
        this.render();
    }

    // Populate the dates object to display a calendar.
    public render(): void {
        
        let monthCalendar: any[] = [];

        let previousMonth: myDate = new myDate(this.viewDate.year, this.viewDate.month - 1);

        let daysInPreviousMonth = previousMonth.daysInMonth();
        let daysInCurrentMonth = this.viewDate.daysInMonth();
        let firstDayOfCurrentMonth = this.viewDate.firstDayOfMonth();

        let date = new myDate(this.viewDate.year, this.viewDate.month, 1);
        for (let i = 1; i < 7; i++) {
            let week: myCalendarCell[] = [];
            // build first week based on past month's data, if necessary
            if (i === 1) {
                let previousMonthDays = daysInPreviousMonth - firstDayOfCurrentMonth + 1;
                for (let j = previousMonthDays; j <= daysInPreviousMonth; j++) {
                    let calendarDate = new myDate(previousMonth.year, previousMonth.month, j);
                    week.push(this.createCell(calendarDate));
                }
                let daysLeft = 7 - week.length;
                for (let j = 0; j < daysLeft; j++) {
                    let calendarDate = new myDate(date.year, date.month, date.day);
                    week.push(this.createCell(calendarDate));
                    date.day++;
                }
            } else {
                for (let j = 1; j < 8; j++) {
                    if (date.day > daysInCurrentMonth) {
                        date.day = 1;
                        date.shiftMonth(1);
                    }
                    let calendarDate = new myDate(date.year, date.month, date.day);
                    week.push(this.createCell(calendarDate));
                    date.day++;
                }
            }
            monthCalendar.push(week);
        }
        this.dates = monthCalendar;
    }

    private createCell(date: myDate): myCalendarCell {
        return new myCalendarCell(date, this.isCurrentMonth(date), this.isCurrentDate(date));
    }

    public isCurrentMonth(date: myDate) {
        return date.month === this.viewDate.month;
    }

    public isCurrentDate(date: myDate) {
        return date.month === this.selectedDate.month &&
            date.year === this.selectedDate.year &&
            date.day === this.selectedDate.day;
    }

}