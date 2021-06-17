import { Component } from '@angular/core';
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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'finalshow';
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 );
  renderer = new THREE.WebGLRenderer();
  modelLoader=new ModelLoaderService();
  guiService=new GuiService();
  loader=new GLTFLoader();
  fontLoader=new THREE.FontLoader();
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

  render(){
    //this.scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025 );
    this.renderer.shadowMap.enabled = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping= THREE.ReinhardToneMapping;
    this.renderer.toneMappingExposure = 0.6;
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.camera.position.z=550;
    this.camera.position.y=-100;
    this.renderer.domElement.style.filter="blur(4px)";
    this.renderer.autoClear=false;
    this.scene.autoUpdate=true;
    console.log(this.scene.children);
    const rendererContainer = document.getElementById('renderContainer')!
    rendererContainer.append(this.renderer.domElement);
  }

  loadModels(){
    //this.modelLoader.loadModel(this.scene,'../assets/3D_models/cloud/scene.gltf',"cloud",1,[400,0,0]);
    this.modelLoader.loadModel(this.scene,'../assets/3D_models/roomprojects/HUB.glb',"room", 1,[0,0,0]);
    this.modelLoader.initTerrain(this.scene,'../assets/Terrain/jotunheimen.bin','../assets/Terrain/jotunheimen-texture-altered.jpg',new THREE.PlaneGeometry(60, 60, 199, 199));
    this.modelLoader.loadModel(this.scene,'../assets/3D_models/zeplin/AIrShip.glb',"zeplin",10,[-400,80,80]);
    this.modelLoader.initTerrain(this.scene,'../assets/Terrain/jotunheimen.bin','../assets/images/rock.jpg',new THREE.PlaneGeometry(60, 60, 199, 199));
  }

  loadDrone(scene:any,url:any){

    let renderer=this.renderer;
    let camera=this.camera;
    const scroll =this.scroll;

    this.loader.load(url, function ( gltf ) {
      gltf.scene.scale.set(2.5,2.5,2.5);
      gltf.scene.name = "drone";
      scene.add(gltf.scene);
      gltf.scene.position.z = 450;
      gltf.scene.position.y = -130;
      gltf.scene.scale.set(2.5,2.5,2.5);
   
        scroll.scrollInit(renderer);
        scroll.textAnim(renderer);
        scroll.cameraAnim(renderer,camera);
        scroll.droneAnim(renderer,scene)       
        scroll.zeppelinAnim(renderer,scene);
        scroll.introAnim(renderer); 

    });
  }


 animate() {
  this.room=this.scene.children[8];
  this.cloud=this.scene.children[10];
	requestAnimationFrame( this.animate.bind(this) );
	this.renderer.render( this.scene, this.camera );
  this.light.sun.position.set(
    this.camera.position.x + 10,
    this.camera.position.y + 10,
    this.camera.position.z + 10
    )
}

fog() {
  const scene = this.scene;
  const color = 0xFFFFFF;
  const near = 1;
  const far = 750;
  scene.fog = new THREE.Fog(color, near, far);
}

// Source: https://stackoverflow.com/questions/20290402/three-js-resizing-canvas
onResizeWindow(event:any){
 location.reload();
}

ngOnInit(): void {
  // this.fog();
  this.sound.addSound(this.scene,this.camera);
  this.text.loadText(this.scene);
  this.light.addLight(this.scene);
  this.skyBox.skybox(this.scene);
  this.loadModels();
  this.loadDrone(this.scene,'../assets/3D_models/drone/DroneAllInOne.glb');
  this.guiSettings();
  this.render();
  this.animate();
}
}
