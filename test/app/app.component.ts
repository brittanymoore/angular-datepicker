import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {

    //private date: Date = new Date(Date.now());
    private date: Date = new Date("1/1/2017");

    public onSubmit(): void {
        console.log("submit");
    }

}