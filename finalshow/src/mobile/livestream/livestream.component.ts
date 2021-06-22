import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livestream',
  templateUrl: './livestream.component.html',
  styleUrls: ['./livestream.component.scss']
})
export class LivestreamComponent implements OnInit {
  checkedInput: String = 'Start Livestream';
  clickSwitch: boolean = true;

  checkedStyle: any = {
    "background-color": "#B89CE0",
    "color": "#000",
  }

  checkedMarginStyle: any = {
    "padding-top": "10px",
  }


  constructor() { }

  onChange(value:any) {
    this.clickSwitch = true;
    this.checkedInput = value;
  }

  onClick(value:any) {
    if(this.clickSwitch) this.checkedInput = '';
    else this.checkedInput = value;
    this.clickSwitch = !this.clickSwitch
  }

  timeCheck() {
    const currentTime = new Date().toString().split(' ')[4].slice(0, 5);
    const hour = Number(currentTime.slice(0,2));
    const minutes = Number(currentTime.slice(3,5));
    if(hour == 18) {
      if(minutes < 55) this.checkedInput = 'Speech Jurgen Dedeckere';
      if(minutes < 50) this.checkedInput = 'Fresh Awards';
      if(minutes < 45) this.checkedInput = 'Digital Making';
      if(minutes < 40) this.checkedInput = 'Manneken pis';
      if(minutes < 35) this.checkedInput = 'Motion';
      if(minutes < 30) this.checkedInput = 'Web';
      if(minutes < 25) this.checkedInput = 'SEADS';
      if(minutes < 15) this.checkedInput = 'Alternate Reality';
      if(minutes < 10) this.checkedInput = 'Mobile Appliance';
      if(minutes < 5) this.checkedInput = 'Start Livestream';
    } else if(hour == 19) {
      if(minutes < 5) this.checkedInput = 'Super Awards';
    }
  }

  ngOnInit() {
    this.timeCheck();
    setInterval(() => {
      this.timeCheck();
    }, 1 * 60 * 1000);
  }

}
