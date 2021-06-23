import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import * as ORBIT from 'three/examples/jsm/controls/OrbitControls';
import { SkyboxComponent } from '../animation/skybox/skybox.component';
import { Vector2 } from 'three';
import { LightsComponent } from './lights/lights.component';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { ModelLoaderService } from 'src/animation/model-loader.service';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss']
})
export class HubComponent implements OnInit {
  title = 'finalshow';
  manager = new THREE.LoadingManager();
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 );
  renderer = new THREE.WebGLRenderer({antialias:true});
  fontLoader=new THREE.FontLoader();
  controls = new ORBIT.OrbitControls( this.camera, this.renderer.domElement);
  mouse = new THREE.Vector2();
  skyBox=new SkyboxComponent();
  lights=new LightsComponent();
  cssscene = new THREE.Scene();
  renderer2 = new CSS3DRenderer();
  modelLoader=new ModelLoaderService();
  loader=new GLTFLoader(this.manager);
  rayCaster=new THREE.Raycaster();
  audio=new Audio();
  playlist=new Array('../assets/sounds/chill-sakura-hz-no-copyright-music.mp3','../assets/sounds/no-copyright-music-funky-groove-funk-music-by-mokka-groove-with-me.mp3','../assets/sounds/5-minutes-of-silence-with-a-black-background.mp3')
  POI_image="../assets/images/poi.png";
  animationLaunch=false;

  constructor() { }

  addTooltip(positionsprite:any,namesprite:any){
    let spritemap = new THREE.TextureLoader().load( '../assets/HUB/pintrest.png' );
    let spritematerial = new THREE.SpriteMaterial( { map: spritemap } );
    let sprite = new THREE.Sprite( spritematerial );
    sprite.name=namesprite;
    sprite.position.copy(positionsprite.clone().normalize().multiplyScalar(30));
    sprite.scale.multiplyScalar(3)
    this.scene.add( sprite );
  }

  onResize(){
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect=window.innerWidth/window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  loadTerrain(){
    this.modelLoader.initTerrain(this.scene,'../assets/Terrain/jotunheimen.bin','../assets/images/rock.jpg',new THREE.PlaneGeometry(60, 60, 199, 199));
    this.modelLoader.loadModel(this.loader,this.scene,"../assets/HUB/FinalRoom.glb","hub",1,[0,0,0],[0,0,0]);
    this.modelLoader.loadModel(this.loader,this.scene,"../assets/HUB/showcaseKader.glb","showcaseKader",1,[0,0,0],[0,0,0]);
    this.modelLoader.loadModel(this.loader,this.scene,"../assets/HUB/questionMark.glb","question",1,[0,0,0],[0,0,0]);
    this.modelLoader.loadModel(this.loader,this.scene,"../assets/3D_models/drone/drone.glb","droneShowRoom",1,[0,0,0],[0,0,0]);
  }

  interestPoints(event:any){
    console.log(event);
    const renderer=this.renderer;
    this.rayCaster.setFromCamera(this.mouse,this.camera);
    let intersects = this.rayCaster.intersectObjects(this.scene.children);
    let audio=this.audio;
    let playlist=this.playlist;
    let animationLaunch=this.animationLaunch;
    // console.log(intersects);
    intersects.forEach(function(intersect:any){
      // if(intersect.object.name ==="Youtube"){
      //   //window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=OfficialRickAstleyOfficialRickAstley")
      //   console.log(document.getElementById("showPopup"));
      //   document.getElementById("showPopup")!.style.display="block";
      //   renderer.domElement.style.filter="blur(4px)";
      // }
      if(intersect.object.type ==='Sprite'){
        console.log(intersect.object);
      }		
      if(intersect.object.name ==="FAQ"){
        window.open("https://www.erasmushogeschool.be/nl/faq");
      }
      if(intersect.object.name ==="Bureau"){
        window.open("https://www.instagram.com/multimedia.ehb/");
      }
      if(intersect.object.name ==="Seads"){
        window.open("https://seads.network/");
      }
      if(intersect.object.name ==="Drone"){
        window.open("https://www.erasmushogeschool.be/nl/faq");
      }
      if(intersect.object.name ==="Showcase"){
        animationLaunch = true;	
      }
      if(intersect.object.name ==="Timetable"){
        window.open("https://www.erasmushogeschool.be/nl/faq");
      }
      if(intersect.object.name ==="Music"){			
        audio.src = playlist[0];
        audio.play();
      }      
    });  
  }

  POIHover(e:any){
    let POI_image=this.POI_image
    this.mouse = new Vector2(( e.clientX / window.innerWidth ) * 2 - 1, -( e.clientY / window.innerHeight ) * 2 + 1);
    this.rayCaster.setFromCamera(this.mouse,this.camera);
    let intersects = this.rayCaster.intersectObjects(this.scene.children);
    
    intersects.forEach(function(intersect){
      if(intersect.object.type ==="Sprite"){
        POI_image = "../assets/images/hoverpoi.png";
        console.log(POI_image);
      }
  });
}

addPOI(spritePosition:any,spriteName:any,scale:number,size:number){
    let spriteMap=new THREE.TextureLoader().load(this.POI_image);
    let spriteMaterial=new THREE.SpriteMaterial({map:spriteMap});
    let sprite=new THREE.Sprite(spriteMaterial);
    sprite.name=spriteName;
    sprite.position.copy(spritePosition.clone().normalize().multiplyScalar(scale));
    sprite.scale.set(size,size,1);
    this.scene.add(sprite);
}

render(){
  this.renderer.setSize( window.innerWidth, window.innerHeight );
  let webgl = document.querySelector('#webgl') as HTMLElement;
  webgl.appendChild( this.renderer.domElement);
  
  this.renderer2.setSize( window.innerWidth, window.innerHeight );
  let css = document.querySelector('#css') as HTMLElement;
  css.appendChild(this.renderer2.domElement );
}

  createYoutubeVideo ( id: any, x: any, y: any, z: any, ry: any ) {
    var div = document.createElement( 'div' );
    div.style.width = '1028px';
    div.style.height = '720px';
    div.style.backgroundColor = '#fff';
  
    var iframe = document.createElement( 'iframe' );
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0px';
    iframe.src = [ 'https://www.youtube.com/embed/', id, '?rel=0' ].join( '' );
    div.appendChild( iframe );
 
    var cssobject = new CSS3DObject( div );
    cssobject.position.set( x, y, z );
    cssobject.rotation.y = ry;
    cssobject.scale.set(0.048, 0.039, 0.045);
    this.cssscene.add(cssobject);
  }

  animate() {
    let showCaseKader=this.scene.getObjectByName("showCaseKader")!;
    this.animateSky(this.scene);
    //this.animateQuestion();
	  requestAnimationFrame( this.animate.bind(this) );
  	this.renderer.render( this.scene, this.camera );
    this.renderer2.render( this.cssscene, this.camera );

    if(this.animationLaunch&&showCaseKader.position.z>=-40){
      showCaseKader.position.z -= 0.5;
    }

  }

  animateQuestion(){
    let question=this.scene.getObjectByName("question")!;
    if(question.position.y==0){
      question.position.y -= 0.05
    }
    else if(question.position.y<=-5){
      question.position.y += 0.05;
    }

  }

  animateSky(scene: THREE.Scene) {
    let skybox = scene.getObjectByName("skybox");
    if (skybox !== undefined) {
      skybox.rotation.y += 0.0001;
    }
  }

  ngOnInit() {
    console.log(this.scene);
    this.controls.enableZoom = false;
    this.controls.rotateSpeed = 0.5;
    this.camera.position.set(1,0,0);
    this.controls.minPolarAngle=1.5;
    this.controls.maxPolarAngle=1.5;
    this.controls.update();
    this.loadTerrain();
    this.render();
    this.createYoutubeVideo('5qap5aO4i9A', -53, 4.5, 2, Math.PI/2 );
    this.manager.onLoad = () => {
      console.log('%cLoading complete!', 'font-weight: bold; color: red;');
      this.lights.addLights(this.scene);
      this.skyBox.skybox(this.scene);
      this.addPOI(new THREE.Vector3(774.7400762274917,326.572099348636,500.7788609564836),'FAQ',50,4);
	    this.addPOI(new THREE.Vector3(-63.1583917551552,278.7872892268489,953.5996996533731),'Showcase',50,3);
	    this.addPOI(new THREE.Vector3(810.7430156789031,328.28534619230544,-500.7371110857296),'Timetable',50,4);
	    this.addPOI(new THREE.Vector3(418.48079552211993,122.81732610080732,895.160534807379),'Seads',50,3);
	    this.addPOI(new THREE.Vector3(-78.02445049463262,-1.723833538445624,-992.2305753975335),'Bureau',50,3);
	    this.addPOI(new THREE.Vector3(-132.2745331415347,185.16937094922847,-969.2290074149466),'Music',50,3);
	    this.addPOI(new THREE.Vector3(997.9876318473309,22.079085278233364,-2.419080501679085),'Drone',50,3);
      this.animate();
    };
  }
}
