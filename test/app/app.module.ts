import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// app component
import { AppComponent } from './app.component';

// custom modules
import { DatepickerModule } from './../../src/datepicker/datepicker.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        DatepickerModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [ ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }