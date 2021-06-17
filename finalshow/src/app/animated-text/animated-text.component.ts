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

      var material = new THREE.MeshLambertMaterial({color: 'rgb(139,0,0)'});
      var mesh = new THREE.Mesh(geometry, material);
      var mesh1 = new THREE.Mesh(geometry1, material);

      let z=0;
      mesh.position.x=-35;
      mesh.position.y=95;
      mesh.position.z=z;
      mesh1.position.x=-40;
      mesh1.position.y=70;
      mesh1.position.z=z;
      let textGroup = new THREE.Group;
      textGroup.add(mesh);
      textGroup.add(mesh1);
      textGroup.name = "final show text"
      scene.add(textGroup);

    } );
  }

  ngOnInit(): void {
  }

}
