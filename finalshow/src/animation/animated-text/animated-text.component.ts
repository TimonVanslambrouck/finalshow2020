import { Component, OnInit } from '@angular/core';
import { FontLoader, Group, Mesh, MeshLambertMaterial, TextGeometry } from 'three';

@Component({
  selector: 'app-animated-text',
  templateUrl: './animated-text.component.html',
  styleUrls: ['./animated-text.component.scss']
})
export class AnimatedTextComponent implements OnInit {

  fontLoader=new FontLoader();

  constructor() { }

  loadText(scene:any){

    this.fontLoader.load( '../assets/fonts/Potra Light_Regular.json', function ( font ) {

      const geometry = new TextGeometry('Final', {
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

      const geometry1 = new TextGeometry('Show', {
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

      var black = new MeshLambertMaterial({color: 'rgb(0,0,0)'});
      var material = new MeshLambertMaterial({color: 'rgb(139,0,0)'});
      var mesh = new Mesh(geometry, material);
      var mesh1 = new Mesh(geometry1, material);

      mesh.position.set(-35,95,0);
      mesh1.position.set(-40,70,0);
      let textGroup = new Group;
      textGroup.add(mesh);
      textGroup.add(mesh1);
      textGroup.name = "final show text"
      scene.add(textGroup);

    } );
  } 

  ngOnInit(): void {
  }

}
