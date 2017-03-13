import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})

export class AppComponent {

    private date:Date;

    public onSubmit():void {
        console.log("click");
    }

}