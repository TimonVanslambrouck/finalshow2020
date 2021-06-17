import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import * as ORBIT from 'three/examples/jsm/controls/OrbitControls';
import { SkyboxComponent } from '../animation/skybox/skybox.component';
import { Vector2 } from 'three';
import { LightsComponent } from './lights/lights.component';
import { RoomComponent } from './room/room.component';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss']
})
export class HubComponent implements OnInit {
  title = 'finalshow';
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 );
  renderer = new THREE.WebGLRenderer();
  fontLoader=new THREE.FontLoader();
  controls = new ORBIT.OrbitControls( this.camera, this.renderer.domElement);
  mouse = new THREE.Vector2();
  skyBox=new SkyboxComponent();
  lights=new LightsComponent();
  room=new RoomComponent();

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

  animate() {
	  requestAnimationFrame( this.animate.bind(this) );
  	this.renderer.render( this.scene, this.camera );
  }

  ngOnInit() {
    this.controls.enableZoom = false;
    this.controls.rotateSpeed = 0.5;
    this.camera.position.set(1,0,0);
    this.controls.update();
    this.lights.addLights(this.scene)
    this.room.addHub(this.scene,this.renderer);
    this.skyBox.skybox(this.scene);
    this.addTooltip(new THREE.Vector3(25.212410522229515,161.51335637049593,983.2827550052176),'Youtube')
	  this.addTooltip(new THREE.Vector3(-975.4083649911996,212.62820916428637,-9.989659863282293),'FAQ')
    this.animate();
  }
}
