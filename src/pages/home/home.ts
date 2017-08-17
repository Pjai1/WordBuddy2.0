import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Geolocation } from 'ionic-native';
import { NavController, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  recognition: any;
  text: string;
  speech: Array<string> = [];

  constructor(public platform: Platform, public navCtrl: NavController, public http: Http, private speechRecognition: SpeechRecognition, private tts: TextToSpeech) {

  }

  ngOnInit() {
    this.speechRecognition.isRecognitionAvailable()
    .then((available: boolean) => console.log(available))

    // Geolocation.getCurrentPosition().then((resp) => {
    //   alert(resp.coords.latitude)
    // })

    let options = {
      text: "hello world",
      locale: "en-GB",
      rate: 0.75
    };

    this.tts.speak(options).then(() => alert('success')).catch((reason: any) => alert(reason));
  }

  record() {
    this.speechRecognition.requestPermission()
    .then(
      () => alert('Granted'),
      () => alert('Denied')
    )
    this.speechRecognition.startListening().subscribe(data => this.speech = data, error => alert(error))
  }

}
