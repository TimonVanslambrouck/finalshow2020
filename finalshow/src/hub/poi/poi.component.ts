import { Component, OnInit, Renderer2 } from '@angular/core';
import * as THREE from 'three';
import { Raycaster, Vector2 } from 'three';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-poi',
  templateUrl: './poi.component.html',
  styleUrls: ['./poi.component.scss']
})
export class PoiComponent implements OnInit {

  POI_image="../assets/images/poi.png";
  popupComponent=new PopupComponent();
  musicPlaying = false;


  constructor() { }


  popup(event:any,renderer:any,rayCaster:any,mouse:any,camera:any,audio:any,playlist:any,animationLaunch:boolean,scene:any,cssrenderer:any,controls:any){
    let musicPlaying = this.musicPlaying;
    let popupComponent=this.popupComponent;
    rayCaster.setFromCamera(mouse,camera);
    let intersects = rayCaster.intersectObjects(scene.children);
    intersects.forEach(function(intersect:any){
      // if(intersect.object.name ==="Youtube"){
      //   //window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=OfficialRickAstleyOfficialRickAstley")
      //   console.log(document.getElementById("showPopup"));
      //   document.getElementById("showPopup")!.style.display="block";
      //   renderer.domElement.style.filter="blur(4px)";
      // }
      if(intersect.object.type ==='Sprite'){
      }		
      if(intersect.object.name ==="FAQ"){
        //window.open("https://www.erasmushogeschool.be/nl/faq");
        popupComponent.showPopup(renderer,cssrenderer,controls,intersect.object.name);
      }
      if(intersect.object.name ==="Bureau"){
        window.open("https://www.instagram.com/multimedia.ehb/");
      }
      if(intersect.object.name ==="Seads"){
        window.open("https://seads.network/");
      }
      if(intersect.object.name ==="Drone"){
        //window.open("https://www.erasmushogeschool.be/nl/faq");
        popupComponent.showPopup(renderer,cssrenderer,controls,intersect.object.name);
      }
      if(intersect.object.name ==="Showcase"){
        animationLaunch = true;
        popupComponent.showPopup(renderer,cssrenderer,controls,intersect.object.name);
      }
      if(intersect.object.name ==="Timetable"){
        //window.open("https://www.erasmushogeschool.be/nl/faq");
        popupComponent.showPopup(renderer,cssrenderer,controls,intersect.object.name);
      }
      if(intersect.object.name ==="Music"){
        musicPlaying = !musicPlaying;
        audio.volume = 0.1;
        audio.src = playlist[0];  
        console.log(musicPlaying);     
        if (musicPlaying) {
          audio.play();
        } else{
          audio.pause();
        }
      }      
    });  
    this.musicPlaying = musicPlaying;
  }

  hover(e:any,mouse:any,rayCaster:any,scene:any,camera:any){
    let POI_image=this.POI_image
    mouse = new Vector2(( e.clientX / window.innerWidth ) * 2 - 1, -( e.clientY / window.innerHeight ) * 2 + 1);
    rayCaster.setFromCamera(mouse,camera);
    let intersects = rayCaster.intersectObjects(scene.children);
    
    intersects.forEach(function(intersect:any){
      if(intersect.object.type ==="Sprite"){
        POI_image = "../assets/images/hoverpoi.png";
      }
  });

  }

  addPOI(positionX:number,positionY:number,positionZ:number,spriteName:any,scale:number,size:number,scene:any){
    let spriteMap=new THREE.TextureLoader().load(this.POI_image);
    let spriteMaterial=new THREE.SpriteMaterial({map:spriteMap});
    spriteMaterial.alphaTest=0.5;
    let sprite=new THREE.Sprite(spriteMaterial);

    sprite.name=spriteName;
    sprite.position.copy(new THREE.Vector3(positionX,positionY,positionZ).clone().normalize().multiplyScalar(scale));
    sprite.scale.set(size,size,1);
    scene.add(sprite);
}

  ngOnInit(): void {
  }

}
