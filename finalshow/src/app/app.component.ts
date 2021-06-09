import { Component } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


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


  render(){
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
    this.scene.background=new THREE.Color("rgb(255,0,0)");
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

    loader.load('../assets/3D_models/north_american_x-15/scene.gltf', function ( gltf ) {

      scene.add( gltf.scene );
      console.log(gltf.scene);
    }, undefined, function ( error ) {
    
      console.error( error );
    
    } );

  }

ngOnInit(): void {
  this.loadModel();
  this.render();
  this.box();
  this.animate();
}

}
