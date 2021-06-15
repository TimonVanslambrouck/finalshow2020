import { Injectable } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { GuiService } from './gui.service';
import { AnimationMixer, AnimationClip, VectorKeyframeTrack, Vector3 } from 'three';

@Injectable({
  providedIn: 'root'
})
export class ModelLoaderService {

  gui=new GuiService();

  loader=new GLTFLoader();

  constructor() { }

  loadModel(scene:any,url:string,guiName:string,scale:number,position:any){

    const loader=this.loader;
    const gui=this.gui;

    loader.load(url, function ( gltf ) {
      let model = gltf.scene;
      model.position.set(position[0],position[1],position[2])
      model.scale.set(scale,scale,scale);

      scene.add(model);

      gui.scale(guiName,model,false,-100,100,0.1);
      gui.position(guiName,model,false,-100,100,0.1);
    });

  }

  private loadTerrain(file: any, callback: any) {
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


  initTerrain(scene:any,terrainFile:any,textureFile:any,planeGeometry:any){
    let resultData: any;
    this.loadTerrain(terrainFile, function(data: any) {
    resultData = data;

    var geometry = planeGeometry;

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
    const typedArray = Float32Array.from(positions);
    geometry.setAttribute('position', new THREE.BufferAttribute(typedArray, 3));

    var material = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(textureFile)
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








}
