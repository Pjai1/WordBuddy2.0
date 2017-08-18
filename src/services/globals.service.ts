import {Injectable} from '@angular/core';

@Injectable()
export class GlobalVars {
    nativeLanguage: string;
    firstName: string
  
  constructor() {
    this.nativeLanguage = "";
    this.firstName = ""; 
  }

  setNativeLanguage(value) {
    this.nativeLanguage = value;
  }

  getNativeLanguage() {
    return this.nativeLanguage;
  }

  setFirstName(value) {
    this.firstName = value;
  }

  getFirstName() {
    return this.firstName;
  }

}