import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as ORBIT from 'three/examples/jsm/controls/OrbitControls';
import { SkyboxComponent } from '../animation/skybox/skybox.component';
import { Vector2 } from 'three';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss']
})
export class HubComponent implements OnInit {
  title = 'finalshow';
  container = document.body;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 );
  renderer = new THREE.WebGLRenderer();
  loader=new GLTFLoader();
  fontLoader=new THREE.FontLoader();
  hlight = new THREE.AmbientLight(0x404040,5);
  controls = new ORBIT.OrbitControls( this.camera, this.renderer.domElement);
  mouse = new THREE.Vector2();
  skyBox=new SkyboxComponent();

  constructor() { }

  lights() {
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.1 );
    directionalLight.position.set(1,0,0);
    directionalLight.castShadow=true;
    this.scene.add( directionalLight );

    const light=new THREE.PointLight(0xc4c4c4,1);
    light.position.set(0,300,500);
    this.scene.add(light)
    const light2 = new THREE.PointLight(0xc4c4c4,1);
    light2.position.set(500,100,0);
    this.scene.add(light2);
    const light3 = new THREE.PointLight(0xc4c4c4,1);
    light3.position.set(0,100,-500);
    this.scene.add(light3);
    const light4 = new THREE.PointLight(0xc4c4c4,1);
    light4.position.set(-500,300,500);
    this.scene.add(light4);
  }

  loaderFunction() {
    const textureLoaderRoom = new THREE.TextureLoader();
    const textureRoom = textureLoaderRoom.load('');
    let loader = new GLTFLoader();

    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.container.appendChild( this.renderer.domElement );

    var room="../assets/HUB/RoomChamber.glb";
    var cube="../assets/HUB/movingBox.glb";
    var cube2="../assets/HUB/red.glb";
    var group = new THREE.Group();
    const scene = this.scene;  


    loader.load(room, function(gltf){
      const car = gltf.scene.children[0];
      gltf.scene.traverse(function(object){
	        if((<THREE.Mesh> object).isMesh){
            //@ts-ignore
            (<THREE.Mesh> object).material.map= textureRoom;
		    }
	    })
      scene.add(gltf.scene);
});

    var whitecube = loader.load(cube, function(gltf){
	    const car = gltf.scene.children[1];
	    gltf.scene.traverse(function(object){
		    //   if(object.isMesh){
		    // 	  object.material.map= textureRoom;
		    //   }
	      })
	      group.add(gltf.scene);
	    // scene.add(gltf.scene);
      });

    var redcube = loader.load(cube2, function(gltf){
	    const car = gltf.scene.children[2];
	    gltf.scene.traverse(function(object){
		    //   if(object.isMesh){
		    // 	  object.material.color.set(0x00FFFF);
		    //   }
	      })
	      group.add(gltf.scene);
	    // scene.add(gltf.scene);
      });
      group.position.x=+100;
      scene.add(group);
  }

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

  onMouseMove( event:any ) {
    this.mouse = new Vector2(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1);
  }

  onClick(event:any){
    console.log(event);
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
        window.open("https://www.erasmushogeschool.be/nl/faq")
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
    this.scene.add(this.hlight);
    this.camera.position.set(1,0,0);
    this.controls.update();
    this.loaderFunction();
    this.lights();
    this.skyBox.skybox(this.scene);
    this.addTooltip(new THREE.Vector3(25.212410522229515,161.51335637049593,983.2827550052176),'Youtube')
	  this.addTooltip(new THREE.Vector3(-975.4083649911996,212.62820916428637,-9.989659863282293),'FAQ')
    this.animate();
  }
}
