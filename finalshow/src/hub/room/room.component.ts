import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  
  
  textureLoader=new THREE.TextureLoader();
  gltfLoader=new GLTFLoader();

  constructor() { }

  addHub(scene:any,renderer:any) {

    const textureRoom = this.textureLoader.load('');

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var room="../assets/HUB/RoomChamber.glb";
    var group = new THREE.Group();

    this.gltfLoader.load(room, function(gltf){
      const car = gltf.scene.children[0];
      gltf.scene.traverse(function(object){
	        if((<THREE.Mesh> object).isMesh){
            //@ts-ignore
            (<THREE.Mesh> object).material.map= textureRoom;
		    }
	    })
      scene.add(gltf.scene);
    });
      scene.add(group);
  }

  ngOnInit(): void {
  }

}
