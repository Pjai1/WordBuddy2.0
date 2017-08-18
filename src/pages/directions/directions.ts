import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
    selector: 'page-directions',
    templateUrl: 'directions.html'
})
export class DirectionsPage {
    location: any;

    constructor(public geolocation: Geolocation, public navCtrl: NavController) {
            
    }

    locateMe() {
        this.geolocation.getCurrentPosition((location) => {
            console.log(location)
            this.location = location;
        }).then().catch((error) => console.log('Error'))
    }
}
