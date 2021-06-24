import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livestream',
  templateUrl: './livestream.component.html',
  styleUrls: ['./livestream.component.scss']
})
export class LivestreamComponent implements OnInit {

  constructor() { }

  goTo2D(){
    document.getElementById('linkTo2D')?.addEventListener('click', function(){
      window.location.href = '/hub';
    })
  }

  ngOnInit() {
    this.goTo2D();
  }

}
