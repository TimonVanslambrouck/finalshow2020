import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.scss']
})
export class AnimationsComponent implements OnInit {

  constructor() { }

  animateQuestion(scene:THREE.Scene){
    let question=scene.getObjectByName("question")!;
    if(question.position.y==0){
      question.position.y -= 0.05
    }
    else if(question.position.y<=-5){
      question.position.y += 0.05;
    }

  }

  animateSky(scene: THREE.Scene) {
    let skybox = scene.getObjectByName("skybox");
    if (skybox !== undefined) {
      skybox.rotation.y += 0.0001;
    }
  }




  ngOnInit(): void {
  }

}
