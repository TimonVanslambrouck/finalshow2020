import { Injectable } from '@angular/core';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  constructor() { }

  scrollAnim(trigger:any,scrub:number=1.2,start:string='top top',end:string='+=20000'){
    gsap.registerPlugin(ScrollTrigger);

    return gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        scrub: scrub,
        start: start,
        end:end,
      }
    })
  }
}
