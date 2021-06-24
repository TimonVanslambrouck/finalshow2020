import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-animated-text',
  templateUrl: './animated-text.component.html',
  styleUrls: ['./animated-text.component.scss']
})
export class AnimatedTextComponent implements OnInit {

  fontLoader=new THREE.FontLoader();

  constructor() { }

  loadText(scene:any){

    this.fontLoader.load( '../assets/fonts/Potra Light_Regular.json', function ( font ) {

      const geometry = new THREE.TextGeometry('Final', {
        font: font,
        size: 20,
        height: 1,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 10,
        bevelSize: 2,
        bevelOffset: 0,
        bevelSegments: 1
      } );

      const geometry1 = new THREE.TextGeometry('Show', {
        font: font,
        size: 20,
        height: 1,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 10,
        bevelSize: 2,
        bevelOffset: 0,
        bevelSegments: 1
      } );      

      var black = new THREE.MeshLambertMaterial({color: 'rgb(0,0,0)'});
      var material = new THREE.MeshLambertMaterial({color: 'rgb(139,0,0)'});
      var mesh = new THREE.Mesh(geometry, material);
      var mesh1 = new THREE.Mesh(geometry1, material);

      mesh.position.set(-35,95,0);
      mesh1.position.set(-40,70,0);
      let textGroup = new THREE.Group;
      textGroup.add(mesh);
      textGroup.add(mesh1);
      textGroup.name = "final show text"
      scene.add(textGroup);

     // addText('Web',scene,font,5,black,[-50,-100,300],[0,0,0]);
     // addText('Alternate Reality',scene,font,5,black,[50,-50,250],[0,0,0]);
     // addText('Mobile Appliance',scene,font,5,black,[-150,50,200],[0,0,0]);
    //addText('Interactive Motion',scene,font,5,black,[0,150,100],[0,0,0]);
    //  addText('Digital making',scene,font,5,black,[-150,-80,300],[0,0,0]);

      function addText(name:string, scene: THREE.Scene, font: THREE.Font, fontsize:number, material:THREE.MeshLambertMaterial, position:number[], rotation:number[]){
        const text = new THREE.TextGeometry(name, {
          font: font,
          size: fontsize,
          height: 1,
          curveSegments: 12,
          bevelEnabled: false,
          bevelThickness: 10,
          bevelSize: 2,
          bevelOffset: 0,
          bevelSegments: 1
        } );
        const textMesh = new THREE.Mesh(text, material);
        textMesh.position.set(position[0],position[1],position[2]);
        let radiansArray = rotation.map(x => x*(Math.PI/180));
        textMesh.rotation.set(radiansArray[0],radiansArray[1],radiansArray[2]);
        textMesh.name = name;
        scene.add(textMesh);
      }
    } );
  } 

  ngOnInit(): void {
  }

}
