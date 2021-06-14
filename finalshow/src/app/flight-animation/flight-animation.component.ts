import { Component, OnInit } from '@angular/core';
import { AnimationClip, VectorKeyframeTrack } from 'three';

@Component({
  selector: 'app-flight-animation',
  templateUrl: './flight-animation.component.html',
  styleUrls: ['./flight-animation.component.scss']
})
export class FlightAnimationComponent implements OnInit {

  constructor() { }

  animationClip() {
    const times = [0,3,6];
    const values = [
      0,0,0,
      2,2,2,
      10,10,10,
    ];
    const positionKF = new VectorKeyframeTrack('.position', times, values);
    const tracks = [positionKF];
    const length = -1;
    const clip = new AnimationClip('move', length, tracks);
  }

  ngOnInit() {
  }

}
