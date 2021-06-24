import { Component, OnInit } from '@angular/core';
import { ScrollService } from '../scroll.service';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

@Component({
  selector: 'app-scroll-animation',
  templateUrl: './scroll-animation.component.html',
  styleUrls: ['./scroll-animation.component.scss']
})
export class ScrollAnimationComponent implements OnInit {

  scroll=new ScrollService();

  constructor() { }

  scrollInit(renderer:any){
    gsap.registerPlugin(ScrollTrigger);

        let loader = document.getElementById('box')!

        ScrollTrigger.create({
          trigger: renderer.domElement,
          start: "top top",
          end: "+=10000",
         onLeave: loading,
        });

        function loading(){
          const rendererContainer = document.getElementById('renderContainer')!
          rendererContainer.style.display = 'none';
          loader.style.display = "block";
          setTimeout(() => {
            window.location.href = "/hub";
          }, 4000);
        }        
  }


  droneAnim(renderer:any,scene:any){

    gsap.registerPlugin(ScrollTrigger);
        
    let drone = scene.getObjectByName("drone");

    var drone_anim = this.scroll.scrollAnim(renderer.domElement,1.2, 'top top', '+=7500').to(drone.position, {
      y: 20,
      x: 0,
      z: 0,
      ease: 'none'
    });

  }

  zeppelinAnim(renderer:any,scene:any){
    gsap.registerPlugin(ScrollTrigger);

    let zeplin = scene.getObjectByName("zeplin");

    var zeppelin_anim= this.scroll.scrollAnim(renderer.domElement).to(zeplin.position, {
      y: 90,
      x:800,
      z: 80,
      ease: 'none'
    });

  }

  cameraAnim(renderer:any,camera:any){

    gsap.registerPlugin(ScrollTrigger);

    var camera_anim= this.scroll.scrollAnim(renderer.domElement).to(camera.position, {
      x: 0,
      y: 45,
      z: 0,
      ease: 'none'
    });//.to(camera.rotation, { x: 0.2, z: 0, y: 0.5 }, 0)
 /*    .to(camera.position, {
      y: 200,
      duration: 1,
      ease: 'none'
    });  */
  }

  introAnim(renderer:any){

    gsap.registerPlugin(ScrollTrigger);

    var intro_anim= this.scroll.scrollAnim(renderer.domElement,1.2, 'top top', '+=1000').to(renderer.domElement, {
       filter:"blur(0px)"
      })

  }

  textAnim(renderer:any){

    gsap.registerPlugin(ScrollTrigger);

    var text_anim= this.scroll.scrollAnim(renderer.domElement,1.2, 'top top', '+=1000').to(document.getElementById("innerbody"),{
       opacity:0,
      }).to(document.getElementById("innerbody"), {
        display: 'none',
       })
  }

  luchtballonAnim(renderer:any, scene:any){

    gsap.registerPlugin(ScrollTrigger);

    let luchtballon = scene.getObjectByName("luchtballon");

    var luchtballon_anim= this.scroll.scrollAnim(renderer.domElement).to(luchtballon.position, {
      y: 130,
      ease: 'none'
    });
  }

  ngOnInit(): void {
  }

}
