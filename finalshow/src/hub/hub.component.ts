import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import * as ORBIT from 'three/examples/jsm/controls/OrbitControls';
import { SkyboxComponent } from '../animation/skybox/skybox.component';
import { Vector2 } from 'three';
import { LightsComponent } from './lights/lights.component';
import { RoomComponent } from './room/room.component';
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
  renderer = new THREE.WebGLRenderer();
  fontLoader=new THREE.FontLoader();
  controls = new ORBIT.OrbitControls( this.camera, this.renderer.domElement);
  mouse = new THREE.Vector2();
  skyBox=new SkyboxComponent();
  lights=new LightsComponent();
  room=new RoomComponent();
  cssscene = new THREE.Scene();
  renderer2 = new CSS3DRenderer();
  modelLoader=new ModelLoaderService();

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

  mousePosition( event:any ) {
    this.mouse = new Vector2(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1);
  }

  loadTerrain(){
    this.modelLoader.initTerrain(this.scene,'../assets/Terrain/jotunheimen.bin','../assets/images/rock.jpg',new THREE.PlaneGeometry(60, 60, 199, 199));
  }

  interestPoints(event:any){
    console.log(event);
    const renderer=this.renderer;
    const rayCaster = new THREE.Raycaster();
    rayCaster.setFromCamera(this.mouse,this.camera);
    let intersects = rayCaster.intersectObjects(this.scene.children);
    // console.log(intersects);
    intersects.forEach(function(intersect:any){
      if(intersect.object.type ==='Sprite'){
        console.log(intersect.object.name)
      }
      if(intersect.object.name ==="Youtube"){
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=OfficialRickAstleyOfficialRickAstley")
      }
      if(intersect.object.name ==="FAQ"){
        console.log(document.getElementById("showPopup"));
        //window.open("https://www.erasmushogeschool.be/nl/faq")
        document.getElementById("showPopup")!.style.display="block";
        renderer.domElement.style.filter="blur(4px)";
      }
    })
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
    this.animateSky(this.scene);
	  requestAnimationFrame( this.animate.bind(this) );
  	this.renderer.render( this.scene, this.camera );
   this.renderer2.render( this.cssscene, this.camera );
  }

  animateSky(scene: THREE.Scene) {
    let skybox = scene.getObjectByName("skybox");
    if (skybox !== undefined) {
      skybox.rotation.y += 0.0001;
    }
  }

  ngOnInit() {
   this.controls.enableZoom = false;
    this.controls.rotateSpeed = 0.5;
    this.camera.position.set(1,0,0);
    this.controls.update();
    this.room.addHub(this.manager, this.scene,this.renderer);
    this.render();
    this.createYoutubeVideo('byO-xihstdw', -53, 4.5, 2, Math.PI/2 );
    this.manager.onLoad = () => {
      console.log('%cLoading complete!', 'font-weight: bold; color: red;');
      this.lights.addLights(this.scene);
      this.skyBox.skybox(this.scene);
      this.addTooltip(new THREE.Vector3(25.212410522229515,161.51335637049593,983.2827550052176),'Youtube')
	    this.addTooltip(new THREE.Vector3(-975.4083649911996,212.62820916428637,-9.989659863282293),'FAQ')
      this.animate();
      this.loadTerrain();
    };
  }
}
