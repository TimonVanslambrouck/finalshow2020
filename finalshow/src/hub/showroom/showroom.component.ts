// https://stackoverflow.com/questions/40751789/how-to-get-html-template-of-an-angular-2-component

import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.scss'],
  encapsulation:ViewEncapsulation.None,
})
export class ShowroomComponent implements OnInit {
  constructor() {

   }

  ngOnInit(): void {
  }

}
