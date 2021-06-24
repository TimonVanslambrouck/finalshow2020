import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livestream',
  templateUrl: './livestream.component.html',
  styleUrls: ['./livestream.component.scss']
})
export class LivestreamComponent implements OnInit {
  checkedInput: String = 'Start Livestream';
  liveInput!: String;
  clickSwitch: boolean = true;

  checkedStyle: any = {
    "background-color": "#B89CE0",
    "color": "#000",
  }

  checkedHourStyle: any = {
    "color": "red",
    "border-left-color": "red",
  }

  constructor() { }

  onChange(value:any) {
    this.clickSwitch = true;
    this.checkedInput = value;
  }

  onClick(value:any) {
    if(this.clickSwitch) this.checkedInput = '';
    else this.checkedInput = value;
    this.clickSwitch = !this.clickSwitch;
  }

  timeCheck() {
    const currentTime = new Date().toString().split(' ')[4].slice(0, 5);
    const hour = Number(currentTime.slice(0,2));
    const minutes = Number(currentTime.slice(3,5));
    if(hour == 18) {
      if(minutes < 55) {
        this.onChange('Speech Jurgen Dedeckere');
        this.liveInput = 'Speech Jurgen Dedeckere';
      }
      if(minutes < 50) {
        this.onChange('Fresh Awards');
        this.liveInput = 'Fresh Awards';
      } 
      if(minutes < 45) {
        this.onChange('Digital Making');
        this.liveInput = 'Digital Making';
      } 
      if(minutes < 40) {
        this.onChange('Manneken pis');
        this.liveInput = 'Manneken pis';
      } 
      if(minutes < 35) {
        this.onChange('Motion');
        this.liveInput = 'Motion';
      } 
      if(minutes < 30) {
        this.onChange('Web');
        this.liveInput = 'Web';
      }
      if(minutes < 25) {
        this.onChange('SEADS');
        this.liveInput = 'SEADS';
      } 
      if(minutes < 15) {
        this.onChange('Alternate Reality');
        this.liveInput = 'Alternate Reality';
      } 
      if(minutes < 10) {
        this.onChange('Mobile Appliance');
        this.liveInput = 'Mobile Appliance';
      } 
      if(minutes < 5) {
        this.onChange('Start Livestream');
        this.liveInput = 'Start Livestream';
      }
    } else if(hour == 19) {
      if(minutes < 5) {
        this.onChange('Super Awards');
        this.liveInput = 'Super Awards';
      } else {
        this.liveInput = 'Slot';
      }
    }
  }

  ngOnInit() {
    this.timeCheck();
    setInterval(() => {
      this.timeCheck();
    }, 1 * 60 * 1000);
  }

}
