export class myDate {

    private MONTHS_IN_YEAR: number = 12;

    public year: number;

    private _month: number;
    public get month() {
        return this._month;
    }
    public set month(val) {
        let adjustedYear = this.getAdjustedYear(val);
        if (this.year !== adjustedYear) {
            this.year = adjustedYear;
        }
        this._month = this.mod(val, this.MONTHS_IN_YEAR);
    }

    public day: number;

    constructor(year: number, month: number, day?: number) { 
        this.year = year;
        this.month = month;
        this.day = day;
    }

    public shiftMonth(shift: number) {
        this.month = this.month + shift;
    }

    private getAdjustedYear(month: number) {
        let year = this.year;
        if (month > (this.MONTHS_IN_YEAR - 1)) {
            year = this.year + 1;
        } else if (month < 0) {
            year = this.year - 1;
        } 
        return year;
    }

    private mod(x, m) {
        return (x % m + m) % m;
    }

    public firstDayOfMonth(): number {
        return new Date(this.year, this.month, 1).getDay();
    }

    public daysInMonth(): number {
        return new Date(this.year, this.month+1, 0).getDate();
    }

}