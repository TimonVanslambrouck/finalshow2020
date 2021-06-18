import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.scss']
})
export class LightsComponent implements OnInit {


  hlight = new THREE.AmbientLight(0x404040,3);
  dLight = new THREE.DirectionalLight( 0xffffff, 0.1 );
  pLight = new THREE.PointLight(0xc4c4c4,1);

  constructor() { }


  addLights(scene:any) {
    this.dLight.position.set(1,0,0);
    this.dLight.castShadow=true;   
    const light = this.pLight;
    light.position.set(0,300,500);
    const light2 = this.pLight;
    light2.position.set(500,100,0);
    const light3 = this.pLight;
    light3.position.set(0,100,-500);
    const light4 = this.pLight;
    light4.position.set(-500,300,500);
     scene.add(light)
     scene.add(light2);
     scene.add(light3);
     scene.add(light4);
     scene.add(this.dLight);
    scene.add(this.hlight);
  }

  ngOnInit(): void {
  }

}
