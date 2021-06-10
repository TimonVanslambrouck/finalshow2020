import { Component } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {GUI} from 'three/examples/jsm/libs/dat.gui.module';
import * as ORBIT from 'three/examples/jsm/controls/OrbitControls';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loader= new GLTFLoader();
  title = 'finalshow';
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  renderer = new THREE.WebGLRenderer();
  geometry = new THREE.BoxGeometry();
  material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  cube = new THREE.Mesh( this.geometry, this.material );
  rectLight=new THREE.RectAreaLight(0xffffff,50,15,15);
  gui=new GUI();
  controls=new ORBIT.OrbitControls(this.camera,this.renderer.domElement);

  guiSettings(){
    const cameraFolder=this.gui.addFolder("Camera");
    cameraFolder.add(this.camera.position,"x",0,10,0.01);
    cameraFolder.add(this.camera.position,"y",0,10,0.01);
    cameraFolder.add(this.camera.position,"z",0,10,0.01);  
    cameraFolder.open();
  }


  render(){
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
    this.scene.background=new THREE.Color();
    this.rectLight.position.set( 5, 5, 0 );
    this.rectLight.lookAt( 0, 0, 0 );
    this.scene.add( this.rectLight );
  }
  
  box(){
    this.scene.add( this.cube );
    this.camera.position.z = 5;
  }

 animate() {
	requestAnimationFrame( this.animate.bind(this) );
	this.renderer.render( this.scene, this.camera );
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
}

  loadModel(){
    const scene=this.scene;
    const loader=this.loader;
    const gui=this.gui;

    loader.load('../assets/3D_models/north_american_x-15/scene.gltf', function ( gltf ) {

      scene.add( gltf.scene );
      console.log(gltf.scene);
      const modelFolder=gui.addFolder("X-15 scale");
      modelFolder.add(gltf.scene.scale,"x",0,10,0.1);
      modelFolder.add(gltf.scene.scale,"y",0,10,0.1);
      modelFolder.add(gltf.scene.scale,"z",0,10,0.1);
      modelFolder.open();


    }, undefined, function ( error ) {
    
      console.error( error );
    
    } );

  }

ngOnInit(): void {
  this.guiSettings();
  this.loadModel();
  this.render();
  this.box();
  this.animate();
}

}
