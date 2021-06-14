import { Injectable } from '@angular/core';
import * as THREE from 'three';
import * as dat from 'dat.gui';

@Injectable({
  providedIn: 'root'
})
export class GuiService {

  constructor() { }

  gui=new dat.GUI();

  position(name:string,object:any,open:boolean=false,min:number=0,max:number=10,step:number=0.01){
    const folder=this.gui.addFolder(name + "-" + "position");
    folder.add(object.position,"x",min,max,step);
    folder.add(object.position,"y",min,max,step);
    folder.add(object.position,"z",min,max,step);
    
    if(open==true){
      folder.open();
    }
  }

  scale(name:string,object:any,open:boolean=false,min:number=0,max:number=10,step:number=0.1){
    const folder=this.gui.addFolder(name + "-" + "scale");
    const scale=folder.add(object.scale,"x",min,max,step);
    folder.add(object.scale,"y",min,max,step);
    folder.add(object.scale,"z",min,max,step);    
    if(open==true){
      folder.open();
    }
  }


}
