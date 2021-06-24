import { Component, OnInit } from '@angular/core';
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

@Component({
  selector: 'app-livestream',
  templateUrl: './livestream.component.html',
  styleUrls: ['./livestream.component.scss']
})
export class LivestreamComponent implements OnInit {

  renderer2 = new CSS3DRenderer();
  constructor() { }

  youtubeStream ( id: any, x: any, y: any, z: any, ry: any,cssscene:any ) {
      var div = document.createElement( 'div' );
      div.style.width = '1028px';
      div.style.height = '720px';
      div.style.backgroundColor = '#fff';
    
      var iframe = document.createElement( 'iframe' );
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = '0px';
      iframe.src = [ 'https://www.youtube.com/embed/', id, '?rel=0' ].join( '' );
      iframe.setAttribute("allowfullscreen", "");
      div.appendChild( iframe );
   
      var cssobject = new CSS3DObject( div );
      cssobject.position.set( x, y, z );
      cssobject.rotation.y = ry;
      cssobject.scale.set(0.048, 0.039, 0.045);
      cssscene.add(cssobject);
  }


  ngOnInit(): void {
  }

}
