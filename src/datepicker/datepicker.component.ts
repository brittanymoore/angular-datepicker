import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { myCalendar } from './classes/calendar.class';
import { myDate } from './classes/date.class';

@Component({
    selector: 'date-picker',
    templateUrl: './datepicker.html',
    styleUrls: ['./datepicker.css'],
    providers: [ // required for ControlValueAccessor
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatepickerComponent),
            multi: true
        }
    ]
})
export class DatepickerComponent implements OnInit, ControlValueAccessor {

    // date = the date object that is passed back up by the form control
    private _date: Date;
    get date() {
        return this._date;
    }
    set date(val) {
        if (val) {
            this._date = val;
            this.calendar.setSelectedDate(new myDate(val.getFullYear(), val.getMonth(), val.getDate()));
            this._dateString = val.toDateString();
            this.propagateChange(val);
        }
    }

    // dateString = a string conversion of date, updated at the same time.
    private _dateString: string;
    get dateString() {
        return this._dateString;
    }

    // required for ControlValueAccessor
    private propagateChange = (_: any) => {};

    private calendarActive: boolean = false;

    private daysOfWeek: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    private monthsOfYear: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    private calendar: myCalendar;

    public toggleCalendar(): void {
        this.calendarActive = !this.calendarActive;
    }

    public ngOnInit(): void {
        this.calendar = new myCalendar();
    }

    public onDateSelect(date) {
        this.date = new Date(date.date.year, date.date.month, date.date.day);
        this.toggleCalendar();
    }

    public prevMonth() {
        this.calendar.prevMonth();
    }

    public nextMonth() {
        this.calendar.nextMonth();
    }

    /* ControlValueAccessor */

    public writeValue(value: any) {
        if (value !== undefined) {
            this.date = value;
        }
    }

    public registerOnChange(fn) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {}

}