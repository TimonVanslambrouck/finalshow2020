import { Component,Directive,Input,ViewChild } from '@angular/core';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as ORBIT from 'three/examples/jsm/controls/OrbitControls';
import { ModelLoaderService } from './model-loader.service';
import { GuiService } from './gui.service';
import { SkyService } from './sky.service';
import { AxesHelper } from 'three';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import{HorizontalBlurShader}from 'three/examples/jsm/shaders/HorizontalBlurShader';
import{VerticalBlurShader}from 'three/examples/jsm/shaders/VerticalBlurShader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // https://stackoverflow.com/questions/15354117/three-js-blur-the-frame-buffer


  title = 'finalshow';
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 );
  renderer = new THREE.WebGLRenderer();
  composer=new EffectComposer(this.renderer)
  modelLoader=new ModelLoaderService();
  guiService=new GuiService();
  loader=new GLTFLoader();
  fontLoader=new THREE.FontLoader();
  sky=new SkyService(this.renderer);
  hblur = new ShaderPass( HorizontalBlurShader );
  vblur = new ShaderPass( VerticalBlurShader );
  drone:any;
  room:any;
  cloud:any;
  //rectLight=new THREE.RectAreaLight(0xffffff,50,200,200);
  //hemiLight=new THREE.HemisphereLight( 0xeeeeee, 0xeeeeee, 1 );
  //hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 1 );
  hemiLight = new THREE.HemisphereLight( 0xffeeb1, 0x080820, 4 );
  sun = new THREE.SpotLight(0xffa95c, 4)
  gui=new dat.GUI();
 //orbit=new ORBIT.OrbitControls(this.camera,this.renderer.domElement);

  guiSettings(){
    this.guiService.position("camera",this.camera,true,-1000,1000);
    //this.guiService.rotate("camera",this.camera,true);
  }

  controls(){
   // console.log(this.orbit);
  //  this.orbit.enableZoom=false;
  }

  // blur(){

  //   this.hblur.uniforms["h"].value=(3.0/window.innerWidth)*window.devicePixelRatio
  //   this.vblur.uniforms["v"].value=(3.0/window.innerWidth)*window.devicePixelRatio
  //   this.composer.addPass( new RenderPass( this.scene, this.camera ) );
  //   this.composer.addPass( this.hblur );
  //   this.vblur.renderToScreen = true;
  //   this.composer.addPass( this.vblur );
  //   console.log(this.hblur);
  //   console.log(this.vblur);

  //   gsap.registerPlugin(ScrollTrigger);
  //   var intro_anim = gsap.timeline({

  //     scrollTrigger: {
      
  //     trigger: this.renderer.domElement,
      
  //     scrub: 1.2,
      
  //     start: 'top top',
      
  //     end:'+=500',
      
  //     }
      
  //     }).to(this.scene, {
        
  //     })
  // }

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

      let z=0;
      mesh.position.x=-35;
      mesh.position.y=95;
      mesh.position.z=z;
      mesh1.position.x=-40;
      mesh1.position.y=70;
      mesh1.position.z=z;
      let textGroup = new THREE.Group;
      textGroup.add(mesh);
      textGroup.add(mesh1);
      scene.add(textGroup);

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
    //this.scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025 );

    this.scene.add(new THREE.AxesHelper(500))
    this.renderer.shadowMap.enabled = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping= THREE.ReinhardToneMapping;
    this.renderer.toneMappingExposure = 0.6;
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.camera.position.z=550;
    this.camera.position.y=-100;
    this.renderer.domElement.style.filter="blur(4px)";
    document.body.appendChild( this.renderer.domElement );
    console.log(this.renderer.domElement);
    this.renderer.autoClear=false;
    this.scene.autoUpdate=true;
    console.log(this.scene);
    console.log(this.scene.children);
  }

  loadModels(){
    this.modelLoader.loadModel(this.scene,'../assets/3D_models/cloud/scene.gltf',"cloud",1,[0,0,0]);
    this.modelLoader.loadModel(this.scene,'../assets/3D_models/roomprojects/RoomProjectsHexa.glb',"room", 1,[0,0,0]);
 //   this.modelLoader.loadModel(this.scene,'../assets/3D_models/cloud/scene.gltf',"cloud");
    this.modelLoader.initTerrain(this.scene,'../assets/Terrain/jotunheimen.bin','../assets/Terrain/jotunheimen-texture-altered.jpg',new THREE.PlaneGeometry(60, 60, 199, 199));
  }

  loadDrone(scene:any,url:any){

    let renderer=this.renderer;
    let camera=this.camera;

    let guiService = this.guiService;
    
    this.loader.load(url, function ( gltf ) {

      scene.add(gltf.scene);
      gltf.scene.position.z = 450;
      gltf.scene.position.y = -130;
      gltf.scene.scale.set(2.5,2.5,2.5);

    
      function scroll(){  
        gsap.registerPlugin(ScrollTrigger);

        let drone=scene.children[8];
        
        guiService.position("drone", drone, true, -1000, 1000)
    
    
        var drone_anim = gsap.timeline({
          scrollTrigger: {
            trigger: renderer.domElement,
            scrub: 1.2,
            start: 'top top',
            end:'+=5000',
          }
        }).to(drone.position, {
          y: 50,
          z: -100,
          duration: 1,
          ease: 'none'
        });
        
        var cam_anim = gsap.timeline({
          scrollTrigger: {
            trigger: renderer.domElement,
            scrub: 1.2,
            start: 'top top',
            end:'+=5000',
          }
        }).to(camera.position, {
          x: 38,
          y: 27,
          z: 137,
          duration: 1,
          ease: 'none'
        })
        .to(camera.rotation, { z: 0, y: 0.5 }, 0)
     /*    .to(camera.position, {
          y: 200,
          duration: 1,
          ease: 'none'
        });  */
      };
      gsap.registerPlugin(ScrollTrigger);
      var intro_anim = gsap.timeline({

       scrollTrigger: {
      
       trigger: renderer.domElement,
      
      scrub: 1.2,
      
       start: 'top top',
      
      end:'+=500',
      
      }
       }).to(renderer.domElement, {
        filter:"blur(0px)"
       })
       var text_anim = gsap.timeline({

        scrollTrigger: {
       
        trigger: renderer.domElement,
       
       scrub: 1.2,
       
        start: 'top top',
       
       end:'+=500',
       
       }
        }).to(document.getElementById("innerbody"), {
         opacity:0,
        })
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
