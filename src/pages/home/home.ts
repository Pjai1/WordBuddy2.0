import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { NavController, Platform } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styles: [`
    .activated-button {
      background-color: #488aff;
      color: #fff;
    }
  `]
})
export class HomePage implements OnInit {
  recordIsActive: boolean = false;
  talkIsActive: boolean = false;
  translateIsActive: boolean = false;
  isRecorded: boolean = false;
  text: string;
  translateValue: string;
  translateValueTwo: string;
  speech: Array<string> = [];
  languageSpoken: string;
  languageRecorded: string;
  recordLanguageSelect: boolean = false;
  apiKey: string;
  nativeLanguage: string;
  placeholderText: string;

  constructor(public platform: Platform, public navCtrl: NavController, public http: Http, private speechRecognition: SpeechRecognition, private tts: TextToSpeech) {

  }

  ngOnInit() {
    this.apiKey = "trnsl.1.1.20170728T225139Z.efa6a34c62ee4898.10ceed10c470fcfa598a82833f88de3f43e82224";
    this.nativeLanguage = "en";
    this.placeholderText = "Text to translate here";
  }

  clickToTranslate(event) {
    let target = event.target || event.srcElement || event.currentTarget;
    let targetValue = target.attributes.id.nodeValue;
    this.translateIsActive = !this.translateIsActive;
    this.translateValue = targetValue;
  }

  activateRecord() {
    this.recordIsActive = !this.recordIsActive;
  }

  activateTalk() {
    this.talkIsActive = !this.talkIsActive;
  }

  translate() {
    let headers = new Headers({'Content-Type': 'application/json'})
    let options = new RequestOptions({headers: headers})
    let body = {
      key: "trnsl.1.1.20170728T225139Z.efa6a34c62ee4898.10ceed10c470fcfa598a82833f88de3f43e82224",
      lang: this.languageRecorded,
      text: this.translateValue
    }

    this.recordLanguageSelect = !this.recordLanguageSelect;
    this.languageRecorded = this.languageRecorded.substring(0,2) + '-' + this.nativeLanguage;

    let url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this.apiKey}&lang=${this.languageRecorded}&text=${this.translateValue}`;
    
    this.http.get(url).map(res => res.json()).subscribe(data => {
      this.placeholderText = "Translated text here";
      this.translateValue = data.text;
    })

  }

  async talk():Promise<any> {
    let options = {
      text: this.translateValueTwo,
      locale: this.languageSpoken,
      rate: 1
    }

    alert(options.text + options.locale + options.rate)
    this.translateValueTwo ="toch ni"

    try {
     await this.tts.speak(options);
    }
    catch (e)
    {
      alert("talk error"  + e);
    }
  }

  async record():Promise<any> {
    this.recordLanguageSelect = !this.recordLanguageSelect;
    this.isRecorded = !this.isRecorded;
    try {
     await this.speechRecognition.startListening().subscribe(data => this.speech = data, error => alert(error))
    }
    catch (e)
    {
      alert("record error " + e)
    }
  }
}
