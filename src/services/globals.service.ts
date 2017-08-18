import {Injectable} from '@angular/core';

@Injectable()
export class GlobalVars {
    nativeLanguage: string;
    recordedLanguage: string;
    firstName: string
  
  constructor() {
    this.nativeLanguage = "";
    this.recordedLanguage = "";
    this.firstName = ""; 
  }

  setNativeLanguage(value) {
    this.nativeLanguage = value;
  }

  getNativeLanguage() {
    return this.nativeLanguage;
  }

  setRecordedLanguage(value) {
    this.recordedLanguage = value;
  }

  getRecordedLanguage() {
    return this.recordedLanguage;
  }

  setFirstName(value) {
    this.firstName = value;
  }

  getFirstName() {
    return this.firstName;
  }

}