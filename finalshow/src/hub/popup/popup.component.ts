import { Component, OnInit } from '@angular/core';
import * as ORBIT from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {


  constructor() { }


  showPopup(renderer:THREE.WebGLRenderer,cssrenderer:any,controls:ORBIT.OrbitControls,poiName:any){


    let popup=document.getElementById("popup");
    document.getElementById("showPopup")!.style.display="block";
    renderer.domElement.style.filter="blur(4px)";
    cssrenderer.domElement.style.filter="blur(4px)";
    controls.enabled=false;

    if(poiName=="Showcase"){

      popup!.innerHTML=`Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Excepturi officiis, fuga perferendis nulla dicta, sunt tempore hic cumque dolorum quis nam ea, 
      ipsum expedita corporis laudantium quaerat suscipit ducimus harum!`;

    }
    if(poiName=="Drone"){

      popup!.innerHTML=`Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Excepturi officiis, fuga perferendis nulla dicta, sunt tempore hic cumque dolorum quis nam ea, 
      ipsum expedita corporis laudantium quaerat suscipit ducimus harum!`;

    }
    if(poiName=="FAQ"){

      popup!.innerHTML=`Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Excepturi officiis, fuga perferendis nulla dicta, sunt tempore hic cumque dolorum quis nam ea, 
      ipsum expedita corporis laudantium quaerat suscipit ducimus harum!`;

    }
    if(poiName=="Bureau"){

      popup!.innerHTML=`Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Excepturi officiis, fuga perferendis nulla dicta, sunt tempore hic cumque dolorum quis nam ea, 
      ipsum expedita corporis laudantium quaerat suscipit ducimus harum!`;

    }
    if(poiName=="Seads"){

      popup!.innerHTML=`Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Excepturi officiis, fuga perferendis nulla dicta, sunt tempore hic cumque dolorum quis nam ea, 
      ipsum expedita corporis laudantium quaerat suscipit ducimus harum!`;

    }
    if(poiName=="Timetable"){

      popup!.innerHTML=`Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Excepturi officiis, fuga perferendis nulla dicta, sunt tempore hic cumque dolorum quis nam ea, 
      ipsum expedita corporis laudantium quaerat suscipit ducimus harum!`;

    }
  }



  ngOnInit(): void {
  }

}
