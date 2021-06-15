import { Injectable } from '@angular/core';
import * as THREE from 'three';
import * as dat from 'dat.gui';

@Injectable({
  providedIn: 'root'
})
export class GuiService {

  constructor() { }

  gui=new dat.GUI();

  position(name:string,object:any,open:boolean=false,min:number=0,max:number=1000,step:number=1){
    const folder=this.gui.addFolder(name + "-" + "position");
    folder.add(object.position,"x",min,max,step).listen();
    folder.add(object.position,"y",min,max,step).listen();
    folder.add(object.position,"z",min,max,step).listen();
    
    if(open==true){
      folder.open();
    }
  }

  scale(name:string,object:any,open:boolean=false,min:number=0,max:number=1000,step:number=1){
    const folder=this.gui.addFolder(name + "-" + "scale");
    const scale=folder.add(object.scale,"x",min,max,step).listen();
    folder.add(object.scale,"y",min,max,step).listen();
    folder.add(object.scale,"z",min,max,step).listen();    
    if(open==true){
      folder.open();
    }
  }

  rotate(name:string,object:any,open:boolean=false,min:number=0,max:number=10,step:number=0.1){
    const folder=this.gui.addFolder(name + "-" + "scale");
    const rotate=folder.add(object.rotate,"x",min,max,step).listen();
    folder.add(object.rotate,"y",min,max,step).listen();
    folder.add(object.rotate,"z",min,max,step).listen();    
    if(open==true){
      folder.open();
    }
  }





}
