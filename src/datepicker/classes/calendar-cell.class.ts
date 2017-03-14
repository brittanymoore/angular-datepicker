import { myDate } from './date.class';

export class myCalendarCell {

    constructor(
        private date: myDate,
        private currentMonth: boolean,
        private currentDate: boolean
    ) { }

}