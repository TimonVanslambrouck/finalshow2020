import { Component } from '@angular/core';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as ORBIT from 'three/examples/jsm/controls/OrbitControls';
import { ModelLoaderService } from './model-loader.service';
import { GuiService } from './gui.service';
import { SkyService } from './sky.service';
import { AxesHelper } from 'three';
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
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 );
  renderer = new THREE.WebGLRenderer();
  modelLoader=new ModelLoaderService();
  guiService=new GuiService();
  loader=new GLTFLoader();
  fontLoader=new THREE.FontLoader();
  sky=new SkyService(this.renderer);
  drone:any;
  room:any;
  cloud:any;
  //rectLight=new THREE.RectAreaLight(0xffffff,50,200,200);
  //hemiLight=new THREE.HemisphereLight( 0xeeeeee, 0xeeeeee, 1 );
  //hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 1 );
  hemiLight = new THREE.HemisphereLight( 0xffeeb1, 0x080820, 4 );
  sun = new THREE.SpotLight(0xffa95c, 4)
  gui=new dat.GUI();
 // orbit=new ORBIT.OrbitControls(this.camera,this.renderer.domElement);

  guiSettings(){
    this.guiService.position("camera",this.camera,true,-1000,1000);
    //this.guiService.rotate("camera",this.camera,true);
  }

  controls(){
   // console.log(this.orbit);
    //this.orbit.enableZoom=false;
  }

  loadText(){

    let scene=this.scene;

    this.fontLoader.load( '../assets/fonts/Potra Light_Regular.json', function ( font ) {

      const geometry = new THREE.TextGeometry('Final', {
        font: font,
        size: 20,
        height: 1,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 10,
        bevelSize: 2,
        bevelOffset: 0,
        bevelSegments: 1
      } );

      const geometry1 = new THREE.TextGeometry('Show', {
        font: font,
        size: 20,
        height: 1,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 10,
        bevelSize: 2,
        bevelOffset: 0,
        bevelSegments: 1
      } );

      var material = new THREE.MeshLambertMaterial({color: 'rgb(2,2,2)'});
      var mesh = new THREE.Mesh(geometry, material);
      var mesh1 = new THREE.Mesh(geometry1, material);

      let z=80;
      mesh.position.x=-35;
      mesh.position.y=25;
      mesh.position.z=z;
      mesh1.position.x=-40;
      mesh1.position.z=z;
      scene.add(mesh);
      scene.add(mesh1);

    } );
  }

  light(){
    this.sun.castShadow = true;
    this.sun.shadow.bias = -0.0001;
    this.sun.shadow.mapSize.width = 1024*4;
    this.sun.shadow.mapSize.height = 1024*4;
    this.scene.add(this.sun);
    //this.rectLight.position.set( 5, 100, 0 );
    //this.rectLight.lookAt( 0, 0, 0 );
    this.hemiLight.position.set(0,20,0);
    //this.scene.add( this.rectLight );
    this.scene.add(this.hemiLight);
  }

  sound(){
    const audioLoader = new THREE.AudioLoader();
    const listener = new THREE.AudioListener();
		this.camera.add( listener );

    const sound1 = new THREE.PositionalAudio( listener );
				audioLoader.load( '../assets/sounds/sound.ogg', function ( buffer ) {
					sound1.setBuffer( buffer );
					sound1.setRefDistance( 20 );
          sound1.setLoop( true );
          sound1.setVolume( 0.5 );
					sound1.play();

				} );
				this.scene.add( sound1 );
  }

  render(){
    this.scene.add(new THREE.AxesHelper(500))
    this.renderer.shadowMap.enabled = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping= THREE.ReinhardToneMapping;
    this.renderer.toneMappingExposure = 0.6;
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.camera.position.z=25;
    document.body.appendChild( this.renderer.domElement );
    this.renderer.autoClear=false;
    this.scene.autoUpdate=true;
    console.log(this.scene);
    console.log(this.scene.children);
  }

  loadModels(){
    this.modelLoader.loadModel(this.scene,'../assets/3D_models/cloud/scene.gltf',"cloud",1,[0,0,0]);
    this.modelLoader.loadModel(this.scene,'../assets/3D_models/roomprojects/RoomProjectsHexa.glb',"room", 1,[0,0,0]);
    this.modelLoader.initTerrain(this.scene,'../assets/Terrain/jotunheimen.bin','../assets/Terrain/jotunheimen-texture-altered.jpg',new THREE.PlaneGeometry(60, 60, 199, 199));
  }

  loadDrone(scene:any,url:any){

    let renderer=this.renderer;
    let camera=this.camera;

    let guiService = this.guiService;
    
    this.loader.load(url, function ( gltf ) {
      scene.add(gltf.scene);

      function scroll(){  
        gsap.registerPlugin(ScrollTrigger);

        let drone=scene.children[9];
        
        guiService.position("drone", drone, true, -300, 300)
    
        console.log(drone);
    
        var drone_anim = gsap.timeline({
          scrollTrigger: {
            trigger: renderer.domElement,
            scrub: 1.2,
            start: 'top top',
            end:'+=5000',
            markers: true,
          }
        }).to(drone.position, {
          x: 200,
          y: 50,
          z: 300,
          duration: 1,
          ease: 'none'
        }).to(drone.rotation, { z: 0, y: 0.5 }, "simultaneously").to(drone.position, {
          x: 200,
          duration: 1,
          ease: 'none'
        });
        

        var cam_anim = gsap.timeline({
          scrollTrigger: {
            trigger: renderer.domElement,
            scrub: 1.2,
            start: 'top top',
            end:'+=5000',
            markers: true,
          }
        }).to(camera.position, {
          x: 0,
          y: 200,
          z: 600,
          duration: 1,
          ease: 'none'
        }).to(camera.rotation, { z: 0, y: 0.5 }, "simultaneously").to(camera.position, {
          y: 200,
          duration: 1,
          ease: 'none'
        });
      };
      scroll();
    });

  }
  
 animate() {
  this.room=this.scene.children[8];
  this.cloud=this.scene.children[10];
	requestAnimationFrame( this.animate.bind(this) );
	this.renderer.render( this.scene, this.camera );
  this.sun.position.set(
    this.camera.position.x + 10,
    this.camera.position.y + 10,
    this.camera.position.z + 10
    )
}

// Source: https://stackoverflow.com/questions/20290402/three-js-resizing-canvas
onResizeWindow(event:any){
  let camera = this.camera;
  let renderer = this.renderer;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

ngOnInit(): void {

  this.sound();
  this.loadModels();
  this.loadDrone(this.scene,'../assets/3D_models/drone/DroneAllInOne.glb');
  this.loadText();
  this.sky.skyGui();
  this.sky.skySettings(this.scene);
  this.controls();
  this.guiSettings();
  this.light();
  this.render();
  this.animate();
}
}
