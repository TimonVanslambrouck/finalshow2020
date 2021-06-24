import { Component, OnInit } from '@angular/core';
import { HemisphereLight, SpotLight } from 'three';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss']
})
export class LightComponent implements OnInit {

  hemiLight = new HemisphereLight( 0xffeeb1, 0x080820, 3);
  sun = new SpotLight(0xffa95c, 4)

  constructor() { }

  addLight(scene:any){
    this.sun.castShadow = true;
    this.sun.shadow.bias = -0.0001;
    this.sun.shadow.mapSize.width = 1024*8;
    this.sun.shadow.mapSize.height = 1024*8;
    this.sun.name = "sun";
    scene.add(this.sun);
    this.hemiLight.position.set(0,20,0);
    this.hemiLight.name = "hemi light"
    scene.add(this.hemiLight);
  }

  ngOnInit(): void {
  }

}
