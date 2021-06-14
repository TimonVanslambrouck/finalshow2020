import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import {Sky} from 'three/examples/jsm/objects/Sky.js';
import * as dat from 'three/examples/jsm/libs/dat.gui.module';

@Component({
  selector: 'app-sky',
  templateUrl: './sky.component.html',
  styleUrls: ['./sky.component.scss']
})
export class SkyComponent implements OnInit {

  constructor() { }

  sky=new Sky();
  sun=new THREE.Vector3();
  gui=new dat.GUI();
  renderer = new THREE.WebGLRenderer();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  effectController = {
    turbidity: 10,
    rayleigh: 3,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.7,
    elevation: 2,
    azimuth: 180,
    exposure: this.renderer.toneMappingExposure
  };

  skySettings(scene:any){
    this.sky.scale.setScalar(450000);
    scene.add(this.sky);
  }


  guiChanged(){
    const uniforms = this.sky.material.uniforms;
    uniforms[ 'turbidity' ].value = this.effectController.turbidity;
    uniforms[ 'rayleigh' ].value = this.effectController.rayleigh;
    uniforms[ 'mieCoefficient' ].value = this.effectController.mieCoefficient;
    uniforms[ 'mieDirectionalG' ].value = this.effectController.mieDirectionalG;

    const phi = THREE.MathUtils.degToRad( 90 - this.effectController.elevation );
    const theta = THREE.MathUtils.degToRad( this.effectController.azimuth );

    this.sun.setFromSphericalCoords( 1, phi, theta );
    uniforms[ 'sunPosition' ].value.copy( this.sun );
    this.renderer.toneMappingExposure = this.effectController.exposure;
}

  skyGui(scene:any){
    console.log(scene);
    const effectFolder=this.gui.addFolder("effects");
    effectFolder.add( this.effectController, 'turbidity', 0.0, 20.0, 0.1 ).onChange( this.guiChanged);
    effectFolder.add( this.effectController, 'rayleigh', 0.0, 4, 0.001 ).onChange( this.guiChanged );
    effectFolder.add( this.effectController, 'mieCoefficient', 0.0, 0.1, 0.001 ).onChange( this.guiChanged );
    effectFolder.add( this.effectController, 'mieDirectionalG', 0.0, 1, 0.001 ).onChange( this.guiChanged );
    effectFolder.add( this.effectController, 'elevation', 0, 90, 0.1 ).onChange( this.guiChanged );
    effectFolder.add( this.effectController, 'azimuth', - 180, 180, 0.1 ).onChange( this.guiChanged );
    effectFolder.add( this.effectController, 'exposure', 0, 1, 0.0001 ).onChange( this.guiChanged );
    this.skySettings(scene);
  }

  render(){
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping= THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.5;
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.camera.position.z=25;
    //document.getElementById("sky").appendChild( this.renderer.domElement );
  }

  ngOnInit(): void {
  }

}
