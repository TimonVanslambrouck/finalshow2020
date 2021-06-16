import { Component } from '@angular/core';
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
  drone:any;
  room:any;
  cloud:any;
 
  hemiLight = new THREE.HemisphereLight( 0xffeeb1, 0x080820, 3 );
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

      var material = new THREE.MeshLambertMaterial({color: 'rgb(139,0,0)'});
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
      textGroup.name = "final show text"
      scene.add(textGroup);

    } );
  }

  light(){
    this.sun.castShadow = true;
    this.sun.shadow.bias = -0.0001;
    this.sun.shadow.mapSize.width = 1024*4;
    this.sun.shadow.mapSize.height = 1024*4;
    this.sun.name = "sun";
    this.scene.add(this.sun);
    //this.rectLight.position.set( 5, 100, 0 );
    //this.rectLight.lookAt( 0, 0, 0 );
    this.hemiLight.position.set(0,20,0);
    //this.scene.add( this.rectLight );
    this.hemiLight.name = "hemi light"
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
          sound1.setVolume( 0 );
					sound1.play();
          sound1.name = "sound";

				} );
				this.scene.add( sound1 );
  }

  render(){
    //this.scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025 );
    let axes = new THREE.AxesHelper(500);
    axes.name = "helper axes";
    //this.scene.add(axes)
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
    const rendererContainer = document.getElementById('renderContainer')!
    rendererContainer.append(this.renderer.domElement);
  }

  loadModels(){
    this.modelLoader.loadModel(this.scene,'../assets/3D_models/cloud/scene.gltf',"cloud",1,[400,0,0]);
    this.modelLoader.loadModel(this.scene,'../assets/3D_models/roomprojects/HUB.glb',"room", 1,[0,0,0]);
 //   this.modelLoader.loadModel(this.scene,'../assets/3D_models/cloud/scene.gltf',"cloud");
    this.modelLoader.initTerrain(this.scene,'../assets/Terrain/jotunheimen.bin','../assets/Terrain/jotunheimen-texture-altered.jpg',new THREE.PlaneGeometry(60, 60, 199, 199));
     this.modelLoader.loadModel(this.scene,'../assets/3D_models/zeplin/AIrShip.glb',"zeplin",10,[-400,80,80]);
    this.modelLoader.initTerrain(this.scene,'../assets/Terrain/jotunheimen.bin','../assets/images/rock.jpg',new THREE.PlaneGeometry(60, 60, 199, 199));
  }

  loadDrone(scene:any,url:any){

    let renderer=this.renderer;
    let camera=this.camera;

    let guiService = this.guiService;
    
    this.loader.load(url, function ( gltf ) {
      gltf.scene.scale.set(2.5,2.5,2.5);
      gltf.scene.name = "drone";
      scene.add(gltf.scene);
      gltf.scene.position.z = 450;
      gltf.scene.position.y = -130;
      gltf.scene.scale.set(2.5,2.5,2.5);

    
      function scroll(){  
        gsap.registerPlugin(ScrollTrigger);

        let drone = scene.children[0];

        scene.children.forEach((element: any) => {
          if (element.name == "drone") {
            drone = element;
            return;
          }
        });

        console.log(scene.children);

        let clouds = document.getElementById('box')!

        guiService.position("drone", drone, true, -1000, 1000)

        ScrollTrigger.create({
          trigger: renderer.domElement,
          start: "top top",
          end: "+=3900",
          onLeave: loading,
        });

        function loading(){
          const rendererContainer = document.getElementById('renderContainer')!
          rendererContainer.style.display = 'none';
          clouds.style.display = "block";
        }        
    
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
          ease: 'none'
        });

        var zeplin_anim = gsap.timeline({
          scrollTrigger: {
            trigger: renderer.domElement,
            scrub: 1.2,
            start: 'top top',
            end:'+=5000',
          }
        }).to(scene.children[8].position, {
          y: 90,
          x:800,
          z: 80,
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
          x: 90,
          y: 27,
          z: 137,
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

fog() {
  const scene = this.scene;
  const color = 0xFFFFFF;
  const near = 1;
  const far = 750;
  scene.fog = new THREE.Fog(color, near, far);
}

skybox(){
  let loader = new THREE.TextureLoader;
  let materialArray = [];
  let path = "../assets/images/skyBox/";
  let fileName = "yonder";
  let texture_ft = loader.load(`${path}${fileName}_ft.jpg`);
  let texture_bk = loader.load(`${path}${fileName}_bk.jpg`);
  let texture_up = loader.load(`${path}${fileName}_up.jpg`);
  let texture_dn = loader.load(`${path}${fileName}_dn.jpg`);
  let texture_rt = loader.load(`${path}${fileName}_rt.jpg`);
  let texture_lf = loader.load(`${path}${fileName}_lf.jpg`);
  materialArray.push(new THREE.MeshBasicMaterial({
    name: "front",
    map: texture_ft,
    side: THREE.BackSide
  }));
  materialArray.push(new THREE.MeshBasicMaterial({
    name: "back",
    map: texture_bk,
    side: THREE.BackSide
  }));
  materialArray.push(new THREE.MeshBasicMaterial({
    name: "top",
    map: texture_up,
    side: THREE.BackSide
  }));
  materialArray.push(new THREE.MeshBasicMaterial({
    name: "bottom",
    map: texture_dn,
    side: THREE.BackSide
  }));
  materialArray.push(new THREE.MeshBasicMaterial({
    name: "right",
    map: texture_rt,
    side: THREE.BackSide
  }));
  materialArray.push(new THREE.MeshBasicMaterial({
    name: "left",
    map: texture_lf,
    side: THREE.BackSide
  }));
  materialArray.forEach(element => {
    element.side = THREE.BackSide;
  });
  console.log(materialArray);
  let skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
  let skybox = new THREE.Mesh(skyboxGeo, materialArray);
  skybox.name = "skybox";
  skybox.position.set(0,0,0);
  this.scene.add(skybox);
  console.log(this.scene.children);

}

// Source: https://stackoverflow.com/questions/20290402/three-js-resizing-canvas
onResizeWindow(event:any){
 location.reload();
}

ngOnInit(): void {
  // this.fog();
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
  this.skybox();
  this.animate();

}
}
