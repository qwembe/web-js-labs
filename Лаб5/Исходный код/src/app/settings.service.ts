import { Injectable } from '@angular/core';
import {Setting} from './settings';



@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public settings: Setting = {
    start: 100,
    end: 1000,
    interval: 10,
} ;

  getSettings(): Setting {
    return this.settings;
  }

  saveSettings(set: Setting): void {
    this.settings = set;
  }

  constructor() { }
}
