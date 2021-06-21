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
    } else if (document.URL.includes("livestream")) {
      this.currentPage = "Livestream";
    } else if (document.URL.includes("timetable")) {
      this.currentPage = "Timetable";
    } else if (document.URL.includes("faq")) {
      this.currentPage = "FAQ";
    } else if (document.URL.includes("showcaseRoom")) {
      this.currentPage = "ShowcaseRoom";
    } else if (document.URL.includes("networkRoom")) {
      this.currentPage = "NetworkRoom";
    } 
  }

  showOrHideMenu(){
    this.isActive = !this.isActive
  }

}
