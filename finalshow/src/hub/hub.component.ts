import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Component, OnInit } from '@angular/core';
import { LoadingManager, PerspectiveCamera, PlaneGeometry, Raycaster, Scene, Vector2, WebGLRenderer } from 'three';
import * as ORBIT from 'three/examples/jsm/controls/OrbitControls';
import { SkyboxComponent } from '../animation/skybox/skybox.component';
import { LightsComponent } from './lights/lights.component';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { ModelLoaderService } from 'src/animation/model-loader.service';
import { LivestreamComponent } from './livestream/livestream.component';
import { PoiComponent } from './poi/poi.component';
import { AnimationsComponent } from './animations/animations.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss']
})
export class HubComponent implements OnInit {
  title = 'finalshow';
  manager = new LoadingManager();
  scene = new Scene();
  camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 6000 );
  renderer = new WebGLRenderer({antialias:true});
  controls = new ORBIT.OrbitControls( this.camera, this.renderer.domElement);
  mouse = new Vector2();
  skyBox=new SkyboxComponent();
  lights=new LightsComponent();
  livestream=new LivestreamComponent();
  cssscene = new Scene();
  renderer2 = new CSS3DRenderer();
  modelLoader=new ModelLoaderService();
  loader=new GLTFLoader(this.manager);
  rayCaster=new Raycaster();
  audio=new Audio();
  poi=new PoiComponent();
  popupActive=false;
  playlist=new Array('../assets/sounds/chill-sakura-hz-no-copyright-music.mp3','../assets/sounds/no-copyright-music-funky-groove-funk-music-by-mokka-groove-with-me.mp3','../assets/sounds/5-minutes-of-silence-with-a-black-background.mp3');
  animationLaunch=false;
  animations=new AnimationsComponent();

  constructor() { }


  orbitControls(){
    this.controls.enableZoom = false;
    this.controls.rotateSpeed = 0.5;
    this.camera.position.set(1,0,0);
    this.controls.minPolarAngle=1.5;
    this.controls.maxPolarAngle=1.5;
    this.controls.update();
  }

  onResize(){
    window.location.href = window.location.href;
  }

  loadTerrain(){
    this.modelLoader.initTerrain(this.scene,'../assets/Terrain/jotunheimen.bin','../assets/images/rock.jpg',new PlaneGeometry(60, 60, 199, 199));
    this.modelLoader.loadModel(this.loader,this.scene,"../assets/HUB/FinalRoom.glb","hub",1,[0,0,0],[0,0,0]);
    this.modelLoader.loadModel(this.loader,this.scene,"../assets/HUB/showcaseKader.glb","showcaseKader",1,[0,0,0],[0,0,0]);
    this.modelLoader.loadModel(this.loader,this.scene,"../assets/HUB/questionMark.glb","question",1,[0,0,0],[0,0,0]);
    this.modelLoader.loadModel(this.loader,this.scene,"../assets/3D_models/drone/drone.glb","droneShowRoom",1,[0,0,0],[0,0,0]);
  }

  interestPoints(event:any){
      this.poi.popup(event,this.renderer,this.rayCaster,this.mouse,this.camera,this.audio,this.playlist,this.animationLaunch,this.scene,this.renderer2,this.controls);
  }

  // POIHover(e:any){
  //   this.poi.hover(e,this.mouse,this.rayCaster,this.scene,this.camera);
  // }

  mousePosition(event:any){
    this.mouse.x=( event.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y= - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

  addPOIS(){
    this.poi.addPOI(774.7400762274917,326.572099348636,500.7788609564836,'FAQ',50,4,this.scene);
    this.poi.addPOI(63.1583917551552,278.7872892268489,953.5996996533731,'Showcase',50,3,this.scene);
    this.poi.addPOI(810.7430156789031,328.28534619230544,-500.7371110857296,'Timetable',50,4,this.scene);
    this.poi.addPOI(418.48079552211993,122.81732610080732,895.160534807379,'Seads',50,3,this.scene);
    this.poi.addPOI(-78.02445049463262,-1.723833538445624,-992.2305753975335,'Bureau',50,3,this.scene);
    this.poi.addPOI(-132.2745331415347,185.16937094922847,-969.2290074149466,'Music',50,3,this.scene);
    this.poi.addPOI(997.9876318473309,22.079085278233364,-2.419080501679085,'Drone',50,3,this.scene);
  }

render(){
  this.renderer.setSize( window.innerWidth, window.innerHeight );
  let webgl = document.querySelector('#webgl') as HTMLElement;
  webgl.appendChild( this.renderer.domElement);
  
  this.renderer2.setSize( window.innerWidth, window.innerHeight );
  let css = document.querySelector('#css') as HTMLElement;
  css.appendChild(this.renderer2.domElement );

}

  animate() {
    let showCaseKader=this.scene.getObjectByName("showCaseKader")!;
    this.animations.animateSky(this.scene);
    this.animations.animateQuestion(this.scene);
	  requestAnimationFrame( this.animate.bind(this) );
  	this.renderer.render( this.scene, this.camera );
    this.renderer2.render( this.cssscene, this.camera );
    if(this.animationLaunch&&showCaseKader.position.z>=-40){
      showCaseKader.position.z -= 0.5;
    }
  }

  ngOnInit() {
    this.orbitControls();
    this.loadTerrain();
    this.render();
    this.livestream.youtubeStream('5qap5aO4i9A', -53, 4.5, -0.75, Math.PI/2,this.cssscene);
    this.manager.onLoad = () => {
      console.log('%cLoading complete!', 'font-weight: bold; color: red;');
      this.lights.addLights(this.scene);
      this.skyBox.skybox(this.scene);
      this.addPOIS();
      this.animate();
      Swal.fire({
        title: 'Klik op de hexagonen in de ruimte om deze te verkennen!',
        text: "Of druk meteen op de livestream om deze te starten!",
        confirmButtonColor: '#CD9DC8',
        confirmButtonText: 'Ik ben er klaar voor!'
      })
    };
  }
}
