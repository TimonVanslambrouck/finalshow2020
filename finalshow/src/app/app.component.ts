import { Component } from '@angular/core';
import * as THREE from 'three';
import * as dat from 'three/examples/jsm/libs/dat.gui.module';
import * as ORBIT from 'three/examples/jsm/controls/OrbitControls';
import {Sky} from 'three/examples/jsm/objects/Sky.js';
import { ModelLoaderService } from './model-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'finalshow';
  sky=new Sky();
  sun=new THREE.Vector3();
   scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  renderer = new THREE.WebGLRenderer();
  modelLoader=new ModelLoaderService();
  //rectLight=new THREE.RectAreaLight(0xffffff,50,200,200);
  //hemiLight=new THREE.HemisphereLight( 0xeeeeee, 0xeeeeee, 1 );
  //hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 1 );
  hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );

  gui=new dat.GUI();
  orbit=new ORBIT.OrbitControls(this.camera,this.renderer.domElement);
  effectController = {
    turbidity: 10,
    rayleigh: 3,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.7,
    elevation: 2,
    azimuth: 180,
    exposure: this.renderer.toneMappingExposure
  };
  
  guiSettings(){
    const cameraFolder=this.gui.addFolder("Camera");
    cameraFolder.add(this.camera.position,"x",0,10,0.01);
    cameraFolder.add(this.camera.position,"y",0,10,0.01);
    cameraFolder.add(this.camera.position,"z",0,10,0.01);  
    cameraFolder.open();
  }

  controls(){
    console.log(this.orbit);
    //this.orbit.enableZoom=false;
  }

  skySettings(){
    this.sky.scale.setScalar(450000);
    this.scene.add(this.sky);
  }

  guiChanged(){
      const uniforms = this.sky.material.uniforms;
      uniforms[ 'turbidity' ].value = this.effectController.turbidity;
      uniforms[ 'rayleigh' ].value = this.effectController.rayleigh;
      uniforms[ 'mieCoefficient' ].value = this.effectController.mieCoefficient;
      uniforms[ 'mieDirectionalG' ].value = this.effectController.mieDirectionalG;

      const phi = THREE.MathUtils.degToRad( 90 - this.effectController.elevation );
      const theta = THREE.MathUtils.degToRad( this.effectController.azimuth );

      this.sun.setFromSphericalCoords( 1, phi, theta );
      uniforms[ 'sunPosition' ].value.copy( this.sun );
      this.renderer.toneMappingExposure = this.effectController.exposure;
      this.renderer.render(this.scene,this.camera);
  }

  skyGui(){
    const effectFolder=this.gui.addFolder("effects");
    effectFolder.add( this.effectController, 'turbidity', 0.0, 20.0, 0.1 ).onChange( this.guiChanged );
    effectFolder.add( this.effectController, 'rayleigh', 0.0, 4, 0.001 ).onChange( this.guiChanged );
    effectFolder.add( this.effectController, 'mieCoefficient', 0.0, 0.1, 0.001 ).onChange( this.guiChanged );
    effectFolder.add( this.effectController, 'mieDirectionalG', 0.0, 1, 0.001 ).onChange( this.guiChanged );
    effectFolder.add( this.effectController, 'elevation', 0, 90, 0.1 ).onChange( this.guiChanged );
    effectFolder.add( this.effectController, 'azimuth', - 180, 180, 0.1 ).onChange( this.guiChanged );
    effectFolder.add( this.effectController, 'exposure', 0, 1, 0.0001 ).onChange( this.guiChanged );
    this.guiChanged();
  }

  sceneSettings(){
    //this.scene.background=new THREE.Color();
  }

  light(){
    //this.rectLight.position.set( 5, 100, 0 );
    //this.rectLight.lookAt( 0, 0, 0 );
    this.hemiLight.position.set(0,20,0);
    //this.scene.add( this.rectLight );
    this.scene.add(this.hemiLight);
  }

  render(){
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping= THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.5;
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.camera.position.z=25;
    document.body.appendChild( this.renderer.domElement );
    console.log(this.scene);
  }
  
 animate() {
	requestAnimationFrame( this.animate.bind(this) );
	this.renderer.render( this.scene, this.camera );
}

  loadTerrain(file: any, callback: any) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'arraybuffer';
    xhr.open('GET', file, true);
    xhr.onload = function(evt) {    
      if (xhr.response) {
        callback(new Uint16Array(xhr.response));
      }
    };  
    xhr.send(null);
  }

  initTerrain() {
    let resultData: any;
    let scene = this.scene;
    this.loadTerrain('../assets/Terrain/jotunheimen.bin', function(data: any) {
    resultData = data;
    console.log(resultData);

    var geometry = new THREE.PlaneGeometry(60, 60, 199, 199);
    console.log(geometry);
   
    const position = geometry.attributes.position;
    const vector = new THREE.Vector3();
    let positions: any = [];
   
    for ( let i = 0, l = position.count; i < l; i ++ ) {
        vector.fromBufferAttribute( position, i );
        vector.setZ(resultData[i] / 65535 * 8);
        positions.push(vector.x);
        positions.push(vector.y);
        positions.push(vector.z);
    }
    console.log(positions);
    const typedArray = Float32Array.from(positions);
    console.log(typedArray);
    geometry.setAttribute('position', new THREE.BufferAttribute(typedArray, 3));

    var material = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('../assets/Terrain/jotunheimen-texture-altered.jpg')
    });

    var plane = new THREE.Mesh(geometry, material);
    plane.position.setY(-225);
    scene.add(plane);
    plane.scale.set(20,20,20);
    plane.rotateX(Math.PI / 2);
    plane.rotateY(Math.PI);
    //scene.add(new THREE.DirectionalLight( 0xffffff, 1 ));
    });
  }
  
ngOnInit(): void {
  this.modelLoader.loadModel(this.scene,'../assets/3D_models/cloud/scene.gltf');
  this.modelLoader.loadModel(this.scene,'../assets/3D_models/north_american_x-15/scene.gltf');
  this.controls();
  this.guiSettings();
  this.sceneSettings();
  this.skySettings();
  this.skyGui();
  this.light();
  this.render();
  this.animate();
  this.initTerrain();
}

}
