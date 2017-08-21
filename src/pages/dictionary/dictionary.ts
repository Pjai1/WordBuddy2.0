import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { GlobalVars } from '../../services/globals.service';
import { TextToSpeech } from '@ionic-native/text-to-speech';

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
    textBoxVal: string;
    apiKey: string;
    nativeSet: boolean = false;
    foreignSet: boolean = false;

    constructor(public toast:ToastController, public loader: LoadingController, public tts: TextToSpeech, private http: Http, public globalVar:GlobalVars, public navCtrl: NavController) {
        this.apiKey = "trnsl.1.1.20170728T225139Z.efa6a34c62ee4898.10ceed10c470fcfa598a82833f88de3f43e82224";
        this.nativeList = ["hallo", "ik ben " + this.globalVar.getFirstName(), "Bedankt", "Alstublieft", "Wie ben jij?", "Waar is het treinstation?", "Waar is het toilet?", "Waar is er een goed restaurant?", "Waar is de winkelstraat?", "Waar is het vliegveld?", "Waar is de infobalie?", "Waar is het ziekenhuis?", "Tot ziens"]; 
        this.standardLanguage = "nl";
    }

    ngOnInit() {
        if(this.globalVar.getNativeLanguage() !== "") {
            this.nativeSet = true;
            this.nativeLanguage = this.globalVar.getNativeLanguage();
        }    

        if(this.globalVar.getRecordedLanguage() !== "") {
            this.foreignSet = true;
            this.recordedLanguage = this.globalVar.getRecordedLanguage();
        }  

        if(this.globalVar.getRecordedLanguage() !== "" && this.globalVar.getNativeLanguage() !== "") {
            let bodyNative = {
                key: this.apiKey,
                lang: this.standardLanguage + '-' + this.nativeLanguage.substring(0,2),
                text: this.nativeList
            }
        
        
            let urlNative = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${bodyNative.key}&lang=${bodyNative.lang}&text=${bodyNative.text}`;
            
            this.http.get(urlNative).map(res => res.json()).subscribe(data => {
                let dataArray = data.text[0]
                let splitArray = new Array()
                splitArray = dataArray.split(",")
                this.nativeList = splitArray;
            })

            let bodyForeign = {
                key: this.apiKey,
                lang: this.nativeLanguage.substring(0,2) + '-' + this.recordedLanguage.substring(0,2),
                text: this.nativeList
            }
        
            let urlForeign = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${bodyForeign.key}&lang=${bodyForeign.lang}&text=${bodyForeign.text}`;
            console.log(urlForeign);
            
            this.http.get(urlForeign).map(res => res.json()).subscribe(data => {
                let dataArray = data.text[0]
                let splitArray = new Array()
                splitArray = dataArray.split(",")
                this.translations = splitArray;
            })
        }
    }

    speak(event) {
        let target = event.target || event.srcElement || event.currentTarget;
        let targetValue = target.attributes.id.nodeValue;
        this.textBoxVal = targetValue;
        let toast = this.toast.create({
            message: "Selection made, check below for TTS",
            duration: 3000,
            position: 'top'
        })

        toast.present()
    }

    async talk():Promise<any> {
        let options = {
            text: this.textBoxVal,
            locale: this.recordedLanguage,
            rate: 1
        }

        try {
            await this.tts.speak(options);
        }
        catch (e)
        {
            alert("Something went wrong, try again please.");
        }
    }
}