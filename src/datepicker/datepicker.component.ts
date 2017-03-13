import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'date-picker',
    templateUrl: './datepicker.html',
    styleUrls: ['./datepicker.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatepickerComponent),
            multi: true
        }
    ]
})
export class DatepickerComponent implements OnInit, ControlValueAccessor {

    private _date: Date;
    get date() {
        return this._date;
    }
    set date(val) {
        this._date = val;
        if (val) {
            this._dateString = val.toDateString();
        }
        this.propagateChange(this._date);
    }
    private _dateString: string;
    get dateString() {
        return this._dateString;
    }

    private propagateChange = (_: any) => {};

    private selectedMonth: number;
    private selectedYear: number;

    private calendarActive: boolean = false;

    private daysOfWeek: string[] = ["Sun", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"];
    private calendar: any[] = [];

    constructor() { }

    writeValue(value: any) {
        if (value !== undefined) {
            this.date = value;
        }
    }

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() {}

    public toggleCalendar(): void {
        console.log('click');
        this.calendarActive = !this.calendarActive;
    }

    ngOnInit(): void {

        if (this.date) {
            this.selectedMonth = this.date.getMonth() + 1;
            this.selectedYear = this.date.getFullYear();
        } else {
            this.selectedMonth = new Date(Date.now()).getMonth() + 1;
            this.selectedYear = new Date(Date.now()).getFullYear();
        }

        this.calendar = this.buildMonth(this.selectedMonth, this.selectedYear);

    }

    onDateSelect(date) {
        console.log('date click');
        this.date = new Date(date.date.year, date.date.month, date.date.day);
        this.toggleCalendar();
    }

    private buildMonth(month: number, year: number): any[] {
        
        let monthCalendar = [];

        let daysInPreviousMonth = this.daysInMonth(this.monthAdd(month, -1), year);
        let daysInCurrentMonth = this.daysInMonth(month, year);
        let firstDayOfCurrentMonth = this.firstDayOfMonth(month, year);

        let day = 1;
        let isCurrentMonth = false;
        for (let i = 1; i < 7; i++) {
            let week = [];
            // build first week based on past month's data, if necessary
            if (i === 1) {
                let previousMonthDays = daysInPreviousMonth - firstDayOfCurrentMonth + 1;
                for (let j = previousMonthDays; j <= daysInPreviousMonth; j++) {
                    let date = { year: year, month: this.monthAdd(month, -1), day: j };
                    week.push({ date: date, isCurrentMonth: false });
                }
                isCurrentMonth = true;
                let daysLeft = 7 - week.length;
                for (let j = 0; j < daysLeft; j++) {
                    let date = { year: year, month: month, day: day };
                    week.push({ date: date, isCurrentMonth: true });
                    day++;
                }
            } else {
                for (let j = 1; j < 8; j++) {
                    if (day > daysInCurrentMonth) {
                        day = 1;
                        month = this.monthAdd(month, 1);
                        isCurrentMonth = false;
                    }
                    let date = { year: year, month: month, day: day};
                    week.push({ date: date, isCurrentMonth: isCurrentMonth });
                    day++;
                }
            }
            monthCalendar.push(week);
        }
        return monthCalendar;
    }

    private firstDayOfMonth(month: number, year: number): number {
        let date = new Date();
        date.setDate(1);
        date.setMonth(month - 1);
        date.setFullYear(year);
        return date.getDay();
    }

    private daysInMonth(month: number, year: number): number {
        return new Date(year, month, 0).getDate();
    }

    private mod(x: number, m: number): number {
        return (x % m + m) % m;
    }

    private monthAdd(month: number, x: number): number {
        return this.mod(month + x, 12);
    }

    private isCurrentMonth(month: number): boolean {
        return this.selectedMonth === month;
    }

}