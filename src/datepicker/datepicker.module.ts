import { NgModule } from '@angular/core'; 
import { FormsModule } from '@angular/forms'; 
import { BrowserModule } from '@angular/platform-browser';

// components
import { DatepickerComponent } from './datepicker.component';

@NgModule({
    imports: [ 
        FormsModule,
        BrowserModule
    ],
    providers: [ ],
    declarations: [
        DatepickerComponent
    ],
    exports: [
        DatepickerComponent
    ]
})
export class DatepickerModule { } 