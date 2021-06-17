import { Injectable } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { GuiService } from './gui.service';

@Injectable({
  providedIn: 'root'
})
export class ModelLoaderService {

  gui=new GuiService();

  constructor() { }

  loadModel(loader:any, scene:any,url:string,guiName:string,scale:number,rotation:number[],position:number[],renderer?:any,scroll?:any){

    const gui=this.gui;

    loader.load(url, function ( gltf:any ) {
      let model = gltf.scene;
      let radiansArray = rotation.map(x => x*(Math.PI/180));
      model.rotation.set(radiansArray[0],radiansArray[1],radiansArray[2]);
      model.position.set(position[0],position[1],position[2]);
      model.scale.set(scale,scale,scale);
      model.name = guiName;
      scene.add(model);       
      setTimeout(() => {
        if (guiName == "zeplin") {
          scroll.zeppelinAnim(renderer,scene);
        }
        if (guiName == "luchtballon") {
          scroll.luchtballonAnim(renderer,scene);
        }
      }, 100);
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

    let stone = new THREE.TextureLoader().load(textureFile);
    stone.wrapS = THREE.RepeatWrapping;
    stone.wrapT = THREE.RepeatWrapping;
    stone.repeat.set(5,5);
    var material = new THREE.MeshPhongMaterial({
      map: stone
    });

    var plane = new THREE.Mesh(geometry, material);
    plane.position.setY(-255);
    scene.add(plane);
    plane.scale.set(20,20,20);
    plane.rotateX(Math.PI / 2);
    plane.rotateY(Math.PI);
    });
  }



}
