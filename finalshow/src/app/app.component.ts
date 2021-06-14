import { Component } from '@angular/core';
import * as THREE from 'three';
import * as dat from 'three/examples/jsm/libs/dat.gui.module';
import * as ORBIT from 'three/examples/jsm/controls/OrbitControls';
import {Sky} from 'three/examples/jsm/objects/Sky.js';
import { ModelLoaderService } from './model-loader.service';
import { GuiService } from './gui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'finalshow';
  sky=new Sky();
  sun=new THREE.Vector3();
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  renderer = new THREE.WebGLRenderer();
  modelLoader=new ModelLoaderService();
  guiService=new GuiService();
  //rectLight=new THREE.RectAreaLight(0xffffff,50,200,200);
  //hemiLight=new THREE.HemisphereLight( 0xeeeeee, 0xeeeeee, 1 );
  //hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 1 );
  hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );
  gui=new dat.GUI();
  orbit=new ORBIT.OrbitControls(this.camera,this.renderer.domElement);
  effectController = {
    turbidity: 10,
    rayleigh: 3,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.7,
    elevation: 2,
    azimuth: 180,
    exposure: this.renderer.toneMappingExposure
  };
  
  guiSettings(){
    this.guiService.position("camera",this.camera,true);
  }

  controls(){
    console.log(this.orbit);
    //this.orbit.enableZoom=false;
  }

  skySettings(){
    this.sky.scale.setScalar(450000);
    this.scene.add(this.sky);
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
      this.renderer.render(this.scene,this.camera);
  }

  skyGui(){
    const effectFolder=this.gui.addFolder("effects");
    effectFolder.add( this.effectController, 'turbidity', 0.0, 20.0, 0.1 ).onChange( this.guiChanged );
    effectFolder.add( this.effectController, 'rayleigh', 0.0, 4, 0.001 ).onChange( this.guiChanged );
    effectFolder.add( this.effectController, 'mieCoefficient', 0.0, 0.1, 0.001 ).onChange( this.guiChanged );
    effectFolder.add( this.effectController, 'mieDirectionalG', 0.0, 1, 0.001 ).onChange( this.guiChanged );
    effectFolder.add( this.effectController, 'elevation', 0, 90, 0.1 ).onChange( this.guiChanged );
    effectFolder.add( this.effectController, 'azimuth', - 180, 180, 0.1 ).onChange( this.guiChanged );
    effectFolder.add( this.effectController, 'exposure', 0, 1, 0.0001 ).onChange( this.guiChanged );
    this.skySettings();
    this.guiChanged();
  }

  sceneSettings(){
    //this.scene.background=new THREE.Color();
  }

  light(){
    //this.rectLight.position.set( 5, 100, 0 );
    //this.rectLight.lookAt( 0, 0, 0 );
    this.hemiLight.position.set(0,20,0);
    //this.scene.add( this.rectLight );
    this.scene.add(this.hemiLight);
  }

  render(){
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping= THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.5;
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.camera.position.z=25;
    document.body.appendChild( this.renderer.domElement );
    console.log(this.scene);
  }
  
 animate() {
	requestAnimationFrame( this.animate.bind(this) );
	this.renderer.render( this.scene, this.camera );
}

ngOnInit(): void {
  this.modelLoader.loadModel(this.scene,'../assets/3D_models/cloud/scene.gltf',"cloud");
  this.modelLoader.loadModel(this.scene,'../assets/3D_models/north_american_x-15/scene.gltf',"x-15");
  this.modelLoader.initTerrain(this.scene,'../assets/Terrain/jotunheimen.bin','../assets/Terrain/jotunheimen-texture-altered.jpg',new THREE.PlaneGeometry(60, 60, 199, 199));
  this.controls();
  this.guiSettings();
  this.sceneSettings();
  this.skyGui();
  this.light();
  this.render();
  this.animate();
}

}
