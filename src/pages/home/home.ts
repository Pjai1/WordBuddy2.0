import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { NavController, Platform, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { GlobalVars } from '../../services/globals.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styles: [`
    .activated-button {
      background-color: #3D5E99;
      color: #fff;
    }
  `]
})
export class HomePage implements OnInit {
  recordIsActive: boolean = false;
  talkIsActive: boolean = false;
  translateIsActive: boolean = false;
  isRecorded: boolean = false;
  isNativeSet: boolean = false; 
  text: string;
  translateValueRecord: string;
  translateValueTalk: string;
  speech: Array<string> = [];
  languageSpoken: string;
  languageRecorded: string;
  recordLanguageSelect: boolean = false;
  apiKey: string;
  nativeLanguage: string;
  placeholderText: string;
  firstName: string;

  constructor(public globalVar:GlobalVars, public toast: ToastController, public platform: Platform, public navCtrl: NavController, public http: Http, private speechRecognition: SpeechRecognition, private tts: TextToSpeech) {

  }

  ngOnInit() {
    this.speechRecognition.requestPermission()
    .then(
      () => console.log('Granted'),
      () => console.log('Denied')
    )

    this.apiKey = "trnsl.1.1.20170728T225139Z.efa6a34c62ee4898.10ceed10c470fcfa598a82833f88de3f43e82224";
    this.placeholderText = "Text to translate here";
    if (this.globalVar.getNativeLanguage() === "") {
      this.isNativeSet = false;
    } else {
      this.nativeLanguage = this.globalVar.getNativeLanguage() ;
      this.isNativeSet = true;
    }

    if (this.globalVar.getFirstName()) {
      this.firstName = this.globalVar.getFirstName();
    }
  }

  setNative() {
    let toast = this.toast.create({
      message: "Language set, let's commence!",
      duration: 4000,
      position: 'bottom'
    })
    this.globalVar.setNativeLanguage(this.nativeLanguage);
    this.nativeLanguage = this.globalVar.getNativeLanguage();
    this.isNativeSet = true;
    toast.present();
  }

  clickToTranslateSpeech(event) {
    let target = event.target || event.srcElement || event.currentTarget;
    let targetValue = target.attributes.id.nodeValue;
    this.translateIsActive = !this.translateIsActive;
    this.translateValueRecord = targetValue;
  }

  activateRecord() {
    this.recordIsActive = !this.recordIsActive;
  }

  activateTalk() {
    this.talkIsActive = !this.talkIsActive;
  }

  translateRecord() {
    let toast = this.toast.create({
      message: "Translation successful, hopefully you'll understand better now!",
      duration: 4000,
      position: 'bottom'
    })

    let body = {
      key: this.apiKey,
      lang: this.languageRecorded.substring(0,2) + '-' + this.nativeLanguage.substring(0,2),
      text: this.translateValueRecord
    }

    this.recordLanguageSelect = !this.recordLanguageSelect;

    let url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${body.key}&lang=${body.lang}&text=${body.text}`;
    
    this.http.get(url).map(res => res.json()).subscribe(data => {
      this.placeholderText = "Translated text here";
      this.translateValueRecord = data.text;
      toast.present();
    })

  }

  translateTalk() {
    let toast = this.toast.create({
      message: "Translation successful, now start talking!",
      duration: 4000,
      position: 'top'
    })

    let body = {
      key: this.apiKey,
      lang: this.languageSpoken.substring(0,2) + '-' + this.nativeLanguage.substring(0,2),
      text: this.translateValueTalk
    }

    

    let url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${body.key}&lang=${body.lang}&text=${body.text}`;
    console.log(url);

    this.http.get(url).map(res => res.json()).subscribe(data => {
      this.placeholderText = "Translated text here";
      this.translateValueTalk = data.text;
      toast.present()
    })

  }

  async talk():Promise<any> {
    let options = {
      text: this.translateValueTalk,
      locale: this.languageSpoken,
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

  async record():Promise<any> {
    this.speech = [];
    this.recordLanguageSelect = !this.recordLanguageSelect;
    this.isRecorded = !this.isRecorded;

    try {
     await this.speechRecognition.startListening().subscribe(data => this.speech = data, error => alert("Something went wrong, try again please."))
    }
    catch (e)
    {
      alert("Something went wrong, try again please.")
    }
  }
}
