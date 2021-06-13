import { Injectable } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class ModelLoaderService {

  loader=new GLTFLoader();

  constructor() { }

  loadModel(scene:any,url:string){

    const loader=this.loader;

    loader.load(url, function ( gltf ) {
      
      scene.add( gltf.scene );
      console.log(gltf.scene);

    }, undefined, function ( error ) {
    
      console.error( error );
    
    } );

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
    console.log(resultData);

    var geometry = planeGeometry;
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
