import { Injectable } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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

}
