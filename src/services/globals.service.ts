import {Injectable} from '@angular/core';

@Injectable()
export class GlobalVars {
    nativeLanguage: string;
  
  constructor() {
    this.nativeLanguage = "";
  }

  setNativeLanguage(value) {
    this.nativeLanguage = value;
  }

  getNativeLanguage() {
    return this.nativeLanguage;
  }

}