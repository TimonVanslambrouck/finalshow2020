import { Component } from '@angular/core';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import * as ORBIT from 'three/examples/jsm/controls/OrbitControls';
import { ModelLoaderService } from './model-loader.service';
import { GuiService } from './gui.service';
import { SkyService } from './sky.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'finalshow';
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  renderer = new THREE.WebGLRenderer();
  modelLoader=new ModelLoaderService();
  guiService=new GuiService();
  sky=new SkyService(this.renderer);
  //rectLight=new THREE.RectAreaLight(0xffffff,50,200,200);
  //hemiLight=new THREE.HemisphereLight( 0xeeeeee, 0xeeeeee, 1 );
  //hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 1 );
  hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );
  gui=new dat.GUI();
  orbit=new ORBIT.OrbitControls(this.camera,this.renderer.domElement);

  guiSettings(){
    this.guiService.position("camera",this.camera,true);
  }

  controls(){
    console.log(this.orbit);
    //this.orbit.enableZoom=false;
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
    this.renderer.autoClear=false;
    this.scene.autoUpdate=true;
    console.log(this.scene);
    console.log(this.scene.children);
  }

  loadModels(){
    let cloud=this.modelLoader.loadModel(this.scene,'../assets/3D_models/cloud/scene.gltf',"cloud");
    let plane=this.modelLoader.loadModel(this.scene,'../assets/3D_models/north_american_x-15/scene.gltf',"x-15");
    let drone=this.modelLoader.loadModel(this.scene,'../assets/3D_models/drone/Drone.glb',"drone");
    let room=this.modelLoader.loadModel(this.scene,'../assets/3D_models/roomprojects/RoomProjectsHexa.glb',"room");
    let terrain=this.modelLoader.initTerrain(this.scene,'../assets/Terrain/jotunheimen.bin','../assets/Terrain/jotunheimen-texture-altered.jpg',new THREE.PlaneGeometry(60, 60, 199, 199));
  }
  
 animate() {
	requestAnimationFrame( this.animate.bind(this) );
	this.renderer.render( this.scene, this.camera );
}

ngOnInit(): void {

  this.sky.skyGui();
  this.sky.skySettings(this.scene);
  this.controls();
  this.guiSettings();
  this.sceneSettings();
  this.light();
  this.render();
  this.animate();
  this.loadModels();


}

}
