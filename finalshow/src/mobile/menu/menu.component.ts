import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isActive = false;
  currentPage = 'start';
  constructor() { }

  ngOnInit(): void {
    if (document.URL.includes("mobile")) {
      this.currentPage = "Home";
    } else if (document.URL.includes("Livestream")) {
      this.currentPage = "Livestream";
    } else if (document.URL.includes("Timetable")) {
      this.currentPage = "Timetable";
    } else if (document.URL.includes("FAQ")) {
      this.currentPage = "FAQ";
    } else if (document.URL.includes("ShowcaseRoom")) {
      this.currentPage = "ShowcaseRoom";
    } else if (document.URL.includes("NetworkRoom")) {
      this.currentPage = "NetworkRoom";
    } 
  }

  showOrHideMenu(){
    this.isActive = !this.isActive
  }

}
