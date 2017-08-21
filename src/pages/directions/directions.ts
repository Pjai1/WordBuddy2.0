import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
declare var google;


@Component({
    selector: 'page-directions',
    templateUrl: 'directions.html'
})
export class DirectionsPage {
    hideRouteSearch: boolean = false;
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    start = 'texas';
    end = 'chicago';
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

    constructor(public toast:ToastController, public geolocation: Geolocation, public navCtrl: NavController) {
            
    }

    ionViewDidLoad() {
        this.initMap();
    }

    routeSearchWindow() {
        this.hideRouteSearch = !this.hideRouteSearch;
    }

    initMap() {
        this.geolocation.getCurrentPosition().then((location) => {
            alert(location);
            this.map = new google.maps.Map(this.mapElement.nativeElement, {
                    zoom: 7,
                    center: {lat: location.coords.latitude, lng: location.coords.longitude},
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                });
            
                this.directionsDisplay.setMap(this.map);
        }).catch((error) => {
            console.log("Cannot get current position due to " + error);
            // this worked in browser so had to hardcode to showcase the feature
            this.map = new google.maps.Map(this.mapElement.nativeElement, {
                zoom: 7,
                center: {lat: 51.015827, lng: 4.496858},
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
              });
          
              this.directionsDisplay.setMap(this.map);
        })
      }
    
      calculateAndDisplayRoute() {
        let toast = this.toast.create({
            message: "Route displayed",
            duration: 3000,
            position: 'bottom'
        })
        this.directionsService.route({
          origin: this.start,
          destination: this.end,
          travelMode: 'DRIVING'
        }, (response, status) => {
          if (status === 'OK') {
            this.directionsDisplay.setDirections(response);
            toast.present();
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

      addMarker(){
        let toast = this.toast.create({
            message: "Personal Location Added",
            duration: 3000,
            position: 'bottom'
        })

        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });
        
        let content = "<h4>Your current location</h4>";          
        
        this.addInfoWindow(marker, content);
        toast.present();
       }

       addInfoWindow(marker, content){
        
         let infoWindow = new google.maps.InfoWindow({
           content: content
         });
        
         google.maps.event.addListener(marker, 'click', () => {
           infoWindow.open(this.map, marker);
         });
        
       }
}
