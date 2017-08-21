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
    foreignLang: string;
    foreignText: string;
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
            this.nativeText = "No Native Language Set";
        } else {
            this.nativeText = this.globalVar.getNativeLanguage();
        }

        if (this.globalVar.getRecordedLanguage() === "") {
            this.foreignText = "No Foreign Language Set";
        } else {
            this.foreignText = this.globalVar.getRecordedLanguage();
        }
    }

    setNative() {
        let toast = this.toast.create({
            message: "Native Language set, let's commence!",
            duration: 3000,
            position: 'bottom'
        })
        this.globalVar.setNativeLanguage(this.nativeLang);
        this.nativeText = "Native Language: " + this.globalVar.getNativeLanguage();
        toast.present();
    }

    setForeign() {
        let toast = this.toast.create({
        message: "Foreign Language set, let's commence!",
        duration: 3000,
        position: 'bottom'
        })
        this.globalVar.setRecordedLanguage(this.foreignLang);
        this.foreignText = "Foreign Language: " + this.globalVar.getRecordedLanguage();
        toast.present();
    }

    setFirstName() {
        this.globalVar.setFirstName(this.firstName);
        this.firstNameText = "First Name: " + this.globalVar.getFirstName();
        this.firstNameSet = true;
        let toast = this.toast.create({
        message: "Welcome " + this.globalVar.getFirstName(),
        duration: 3000,
        position: 'bottom'
        })
        toast.present();
    }

}