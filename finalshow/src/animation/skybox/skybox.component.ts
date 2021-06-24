import { Component, OnInit } from '@angular/core';
import { BackSide, BoxGeometry, Mesh, MeshBasicMaterial, TextureLoader } from 'three';

@Component({
  selector: 'app-skybox',
  templateUrl: './skybox.component.html',
  styleUrls: ['./skybox.component.scss']
})
export class SkyboxComponent implements OnInit {

  constructor() { }

  skybox(scene:any){
    let loader = new TextureLoader;
    let materialArray = [];
    let path = "../assets/images/skyBox/";
    let fileName = "yonder";
    let texture_ft = loader.load(`${path}${fileName}_ft.jpg`);
    let texture_bk = loader.load(`${path}${fileName}_bk.jpg`);
    let texture_up = loader.load(`${path}${fileName}_up.jpg`);
    let texture_dn = loader.load(`${path}${fileName}_dn.jpg`);
    let texture_rt = loader.load(`${path}${fileName}_rt.jpg`);
    let texture_lf = loader.load(`${path}${fileName}_lf.jpg`);
    materialArray.push(new MeshBasicMaterial({
      name: "front",
      map: texture_ft,
      side: BackSide
    }));
    materialArray.push(new MeshBasicMaterial({
      name: "back",
      map: texture_bk,
      side: BackSide
    }));
    materialArray.push(new MeshBasicMaterial({
      name: "top",
      map: texture_up,
      side: BackSide
    }));
    materialArray.push(new MeshBasicMaterial({
      name: "bottom",
      map: texture_dn,
      side: BackSide
    }));
    materialArray.push(new MeshBasicMaterial({
      name: "right",
      map: texture_rt,
      side: BackSide
    }));
    materialArray.push(new MeshBasicMaterial({
      name: "left",
      map: texture_lf,
      side: BackSide
    }));
    materialArray.forEach(element => {
      element.side = BackSide;
    });
    let skyboxGeo = new BoxGeometry(6000, 6000, 6000);
    let skybox = new Mesh(skyboxGeo, materialArray);
    skybox.name = "skybox";
    skybox.position.set(0,0,0);
    scene.add(skybox);
  }

  ngOnInit(): void {
  }

}
