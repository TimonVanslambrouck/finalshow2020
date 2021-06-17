import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as ORBIT from 'three/examples/jsm/controls/OrbitControls';
import { ModelLoaderService } from './model-loader.service';
import { GuiService } from './gui.service';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SkyboxComponent } from './skybox/skybox.component';
import { AnimatedTextComponent } from './animated-text/animated-text.component';
import { SoundComponent } from './sound/sound.component';
import { LightComponent } from './light/light.component';
import { ScrollAnimationComponent } from './scroll-animation/scroll-animation.component';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss']
})
export class AnimationComponent implements OnInit {
  title = 'finalshow';
  manager = new THREE.LoadingManager();
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 );
  renderer = new THREE.WebGLRenderer();
  modelLoader=new ModelLoaderService();
  guiService=new GuiService();
  loader=new GLTFLoader(this.manager);
  fontLoader=new THREE.FontLoader(this.manager);
  skyBox=new SkyboxComponent();
  text=new AnimatedTextComponent();
  sound=new SoundComponent();
  light=new LightComponent();
  scroll=new ScrollAnimationComponent();
  drone:any;
  room:any;
  cloud:any;

  gui=new dat.GUI();
 //orbit=new ORBIT.OrbitControls(this.camera,this.renderer.domElement);

  guiSettings(){
    this.guiService.position("camera",this.camera,true,-1000,1000);
    //this.guiService.rotate("camera",this.camera,true);
  }

  // Source: https://stackoverflow.com/questions/20290402/three-js-resizing-canvas
  onResizeWindow(event:any){
    window.location.href = window.location.href;
  }

  render(){
    //this.scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025 );
    this.renderer.shadowMap.enabled = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping= THREE.ReinhardToneMapping;
    this.renderer.toneMappingExposure = 0.6;
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.camera.position.set(0,-150,550);
    this.renderer.domElement.style.filter="blur(4px)";
    this.renderer.autoClear=false;
    this.scene.autoUpdate=true;
    console.log(this.scene.children);
    const rendererContainer = document.getElementById('renderContainer')!
    rendererContainer.append(this.renderer.domElement);
  }

  loadModels(){
    this.modelLoader.loadModel(this.loader, this.scene,'../assets/3D_models/roomprojects/HUB.glb',"room", 1,[0,0,0],[0,0,0]);
    this.modelLoader.loadModel(this.loader, this.scene,'../assets/3D_models/drone/DroneAllInOne.glb',"drone", 2.5,[0,0,0],[0,-20,450]);
 //   this.modelLoader.loadModel(this.scene,'../assets/3D_models/cloud/scene.gltf',"cloud");
     this.modelLoader.loadModel(this.loader, this.scene,'../assets/3D_models/zeplin/AIrShip.glb',"zeplin",10,[0,0,0],[-400,80,80], this.render,this.scroll);
    this.modelLoader.initTerrain(this.scene,'../assets/Terrain/jotunheimen.bin','../assets/images/rock.jpg',new THREE.PlaneGeometry(60, 60, 199, 199));
    this.modelLoader.loadModel(this.loader, this.scene,'../assets/3D_models/balloon/luchtballon.glb',"luchtballon",10,[0,180,0],[150,-100,200], this.render,this.scroll);
    this.modelLoader.loadModel(this.loader, this.scene,'../assets/3D_models/balloon/apple.glb',"apple",7,[0,180,0],[-350,-100,100]);
    this.modelLoader.loadModel(this.loader, this.scene,'../assets/3D_models/balloon/android.glb',"android",7,[0,0,0],[150,-150,350]);

  }

  loadDrone(scene:any,url:any){

    let renderer=this.renderer;
    let camera=this.camera;
    const scroll =this.scroll;

    this.loader.load(url, function ( gltf ) {
        scroll.scrollInit(renderer);
        scroll.textAnim(renderer);
        scroll.cameraAnim(renderer,camera);
        scroll.droneAnim(renderer,scene);
        scroll.introAnim(renderer);
    });
  }

 animate() {
  let scene = this.scene;
  this.animateText(scene);
  this.animateBalloons(scene);
	requestAnimationFrame( this.animate.bind(this) );
	this.renderer.render( this.scene, this.camera );
  this.light.sun.position.set(
    this.camera.position.x + 10,
    this.camera.position.y + 10,
    this.camera.position.z + 10
    )
}
  animateBalloons(scene: THREE.Scene) {
    let balloonAndroid = scene.getObjectByName("android");
    let balloonApple = scene.getObjectByName("apple");
    if (balloonAndroid !== undefined && balloonApple !== undefined) {
      balloonAndroid.rotation.y += 0.005;
      balloonApple.rotation.y += 0.005;
      balloonAndroid.position.y += Math.random() * 0.01;
      balloonApple.position.y += Math.random() * 0.01;
    } 
  }
  animateText(scene:THREE.Scene) {
    let text = scene.getObjectByName("final show text");
    if (text !== undefined) {
      text.rotation.y += 0.005;
    }    
  }

fog() {
  const scene = this.scene;
  const color = 0x9fa3a6;
  const near = 1;
  const far = 1500;
  scene.fog = new THREE.Fog(color, near, far);
}

ngOnInit(): void {
  this.loadModels();
  this.loadDrone(this.scene,'../assets/3D_models/drone/DroneAllInOne.glb');
  this.manager.onLoad = () => {
    console.log('%cLoading complete!', 'font-weight: bold; color: red;');
    this.fog();
    console.log("NEXT");
    this.sound.addSound(this.scene,this.camera);
    this.text.loadText(this.scene);
    this.light.addLight(this.scene);
    this.skyBox.skybox(this.scene);
    this.guiSettings();
    this.render();
    this.animate();
  };
}

}