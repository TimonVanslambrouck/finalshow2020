import { Component } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as dat from 'dat.gui';
import * as ORBIT from 'three/examples/jsm/controls/OrbitControls';
import { ModelLoaderService } from './model-loader.service';
import { GuiService } from './gui.service';
import { SkyComponent } from './sky/sky.component';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

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
  sky = new SkyComponent();
  //rectLight=new THREE.RectAreaLight(0xffffff,50,200,200);
  //hemiLight=new THREE.HemisphereLight( 0xeeeeee, 0xeeeeee, 1 );
  //hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 1 );
  hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );
  gui=new dat.GUI();
 // orbit=new ORBIT.OrbitControls(this.camera,this.renderer.domElement);

  guiSettings(){
    this.guiService.position("camera",this.camera,true);
  }

  controls(){
   // console.log(this.orbit);
    //this.orbit.enableZoom=false;
  }

  scrollSettings(){  
    gsap.registerPlugin(ScrollTrigger);

    var cam_anim = gsap.timeline({
      scrollTrigger: {
        trigger: 'canvas',
        scrub: 1.2,
        start: 'top top',
        end:'+=5000',
        markers: true,
      }
    }).to(this.camera.position, {
      x: 200,
      y: 50,
      z: 300,
      duration: 1,
      ease: 'none'
    }).to(this.camera.position, {
      y: 200,
      duration: 1,
      ease: 'none'
    });
    
  };

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
  this.modelLoader.loadModel(this.scene,'../assets/3D_models/north_american_x-15/scene.gltf',"x-15");
  this.modelLoader.initTerrain(this.scene,'../assets/Terrain/jotunheimen.bin','../assets/Terrain/jotunheimen-texture-altered.jpg',new THREE.PlaneGeometry(60, 60, 199, 199));
  this.sky.skyGui(this.scene);
  this.controls();
  this.guiSettings();
  this.scrollSettings();
  this.light();
  this.render();
  this.animate();
}
}
