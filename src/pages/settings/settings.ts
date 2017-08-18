import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { GlobalVars } from '../../services/globals.service';

@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage implements OnInit{
    nativeLang: string;
    nativeText: string;
    firstNameText: string;
    firstName: string;
    firstNameSet: boolean = false;

    constructor(public toast: ToastController, public globalVar: GlobalVars, public navCtrl: NavController) {
        
    }

    ngOnInit() {
        if(this.globalVar.getFirstName() === "") {
            this.firstNameText = "No Firstname Set";
        } else {
            this.firstNameText = this.globalVar.getFirstName();
            this.firstNameSet = true;
        }

       if (this.globalVar.getNativeLanguage() === "") {
            this.nativeText = "No Current Native Language Set";
        } else {
            this.nativeText = this.globalVar.getNativeLanguage();
        }
    }

    setNative() {
        let toast = this.toast.create({
        message: "Language set, let's commence!",
        duration: 3000,
        position: 'top'
        })
        this.globalVar.setNativeLanguage(this.nativeLang);
        this.nativeText = "Current Native Language: " + this.globalVar.getNativeLanguage();
        toast.present();
    }

    setFirstName() {
        this.globalVar.setFirstName(this.firstName);
        this.firstNameText = "Your First Name: " + this.globalVar.getFirstName();
        this.firstNameSet = true;
        let toast = this.toast.create({
        message: "Welcome " + this.globalVar.getFirstName(),
        duration: 3000,
        position: 'top'
        })
        toast.present();
    }

}