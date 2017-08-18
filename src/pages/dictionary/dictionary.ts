import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController } from 'ionic-angular';
import { GlobalVars } from '../../services/globals.service';

@Component({
    selector: 'page-dictionary',
    templateUrl: 'dictionary.html'
})
export class DictionaryPage implements OnInit {
    nativeList: Array<String> = [];
    translations: Array<String> = [];
    nativeLanguage: string;
    recordedLanguage: string;
    standardLanguage: string;
    apiKey: string;

    constructor(private http: Http, public globalVar:GlobalVars, public navCtrl: NavController) {
        this.apiKey = "trnsl.1.1.20170728T225139Z.efa6a34c62ee4898.10ceed10c470fcfa598a82833f88de3f43e82224";
        this.nativeList = ["hallo", "ik ben " + this.globalVar.getFirstName(), "Wie ben jij?"]; 
        this.standardLanguage = "nl";
    }

    ngOnInit() {
        this.nativeLanguage = this.globalVar.getNativeLanguage();
        this.recordedLanguage = this.globalVar.getRecordedLanguage();
        let headers = new Headers({'Content-Type': 'application/json'})
        let options = new RequestOptions({headers: headers})
        let body = {
          key: this.apiKey,
          lang: this.standardLanguage + '-' + 'en',
          text: this.nativeList
        }
    
    
        let url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${body.key}&lang=${body.lang}&text=${body.text}`;
        
        this.http.get(url).map(res => res.json()).subscribe(data => {
            let dataArray = data.text[0]
            let splitArray = new Array()
            splitArray = dataArray.split(",")
            this.nativeList = splitArray;
        })
    }
}