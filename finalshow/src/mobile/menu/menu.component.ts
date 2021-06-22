import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isActive = false;
  currentPage = 'start';
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.router.url === '/livestream') {
      this.currentPage = "Livestream";
    } else if (this.router.url === '/faq') {
      this.currentPage = "FAQ";
    } else if (this.router.url === '/showroom') {
      this.currentPage = "Showroom";
    } 
  }

  showOrHideMenu(){
    this.isActive = !this.isActive
  }

}
