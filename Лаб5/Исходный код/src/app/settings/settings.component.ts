import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../settings.service';
import {Setting } from '../settings';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public set: Setting;

  constructor(private setService: SettingsService) {}

  ngOnInit() {
    this.getSettings();
  }

  getSettings(): void {
    this.set = this.setService.getSettings();
  }

  save(): void {
    this.setService.saveSettings(this.set);
  }

}
