import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss']
})
export class LightComponent implements OnInit {

  hemiLight = new THREE.HemisphereLight( 0xffeeb1, 0x080820, 3 );
  sun = new THREE.SpotLight(0xffa95c, 4)

  constructor() { }

  addLight(scene:any){
    this.sun.castShadow = true;
    this.sun.shadow.bias = -0.0001;
    this.sun.shadow.mapSize.width = 1024*4;
    this.sun.shadow.mapSize.height = 1024*4;
    this.sun.name = "sun";
    scene.add(this.sun);
    //this.rectLight.position.set( 5, 100, 0 );
    //this.rectLight.lookAt( 0, 0, 0 );
    this.hemiLight.position.set(0,20,0);
    //this.scene.add( this.rectLight );
    this.hemiLight.name = "hemi light"
    scene.add(this.hemiLight);
  }

  ngOnInit(): void {
  }

}
