import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.scss',]
})
export class ShowroomComponent implements OnInit {

  constructor() { }

  web="";
  motion="";
  ar="";
  digital_making="";
  mobile="";

  async fetchProjects(){

    const response=await fetch("https://finalshowcase.herokuapp.com/final-work/get-all");

    const responseJson=await response.json();

    return responseJson;

  }

  loadProjects(){
    this.fetchProjects().then((data:any)=>{
      console.log(data);
      this.addProjects(data)
    });
  }

  addProjects(data:any){

    data.forEach((project:any) => {

      switch(project.cluster){
        case "web":
        this.web += `<div class="card">
          <img src="${project.images}" class="image" alt="...">
          <div class="card-body">
            <h2 class="card-title">${project.name}</h2>
            <a class="btn">See Project</a>
            <h3 class="card-subtitle">${project.username}</h3>
            <p class="card-text">${project.description}</p>
            <div class="more">
            <div hidden>${project.email}</div>
            </div>  
          </div>
          </div>`
        break;
        case "motion":
        this.motion +=`<div class="card">
          <img src="${project.images}" class="image" alt="...">
          <div class="card-body">
            <h2 class="card-title">${project.name}</h2>
            <a class="btn">See Project</a>
            <h3 class="card-subtitle">${project.username}</h3>
            <p class="card-text">${project.description}</p>
            <div class="more">
            <div hidden>${project.email}</div>
            </div>          
          </div>
          </div>`
        break;
        case "ar":
        this.ar +=`<div class="card">
          <img src="${project.images}" class="image" alt="...">
          <div class="card-body">
            <h2 class="card-title">${project.name}</h2>
            <a class="btn">See Project</a>
            <h3 class="card-subtitle">${project.username}</h3>
            <p class="card-text">${project.description}</p>
            <div class="more">
            <div hidden>${project.email}</div>
            </div>  
          </div>
          </div>`
        break;
        case "digital-making":
        this.digital_making +=`<div class="card">
          <img src="${project.images}" class="image" alt="...">
          <div class="card-body">
            <h2 class="card-title">${project.name}</h2>
            <a class="btn">See Project</a>
            <h3 class="card-subtitle">${project.username}</h3>
            <p class="card-text">${project.description}</p>
            <div class="more">
            <div hidden>${project.email}</div>
            </div>  
          </div>
          </div>`
        break;
        case "mobile":
        this.mobile +=`<div class="card">
          <img src="${project.images}" class="image" alt="...">
          <div class="card-body">  
            <h2 class="card-title">${project.name}</h2>
            <a class="btn">See Project</a>
            <h3 class="card-subtitle">${project.username}</h3>
            <p class="card-text">${project.description}</p>
            <div class="more">            
            <div hidden>${project.email}</div>
            </div>  
          </div>
          </div>`
        break;
      }
    
    });
  }

  clusters(event:any){
    let idAttr=event.target.attributes.id;
    let id=idAttr.nodeValue;
    let showcase=document.getElementById("showcase");
    let center=document.getElementsByClassName("center");
    console.log(event.target);
    console.log(id);

    switch(id){
      case "motion":
        center[0].classList.add("fade");
        center[0].classList.remove("center");
        showcase!.innerHTML=this.motion;
      break;
      case "web":
        center[0].classList.add("fade");
        center[0].classList.remove("center");
        showcase!.innerHTML=this.web;
      break;
      case "mobile":
        center[0].classList.add("fade");
        center[0].classList.remove("center");
        showcase!.innerHTML=this.mobile;
      break;
      case "ar":
        center[0].classList.add("fade");
        center[0].classList.remove("center");
        showcase!.innerHTML=this.ar;
      break;
      case "digital-making":
        center[0].classList.add("fade");
        center[0].classList.remove("center");
        showcase!.innerHTML=this.digital_making;
      break;
    }
    event.target.classList.remove("fade");
    event.target.classList.add("center");
    this.addEventListeners();
  }

  addEventListeners(){

    const buttons=document.getElementsByClassName("btn");


      setTimeout(() => {
        for(let i=0;i<buttons.length;i++){
          buttons[i].addEventListener("click",this.page)
        }
      }, 400);

  }

  page(event:any){

    let htmlString="";
    let clusters=document.getElementById("clusters");

    console.log(event.path);

    document.getElementById("clusters")!.style.display="none";
    document.getElementById("showcase")!.style.display="none";
    document.getElementById("back")!.style.display="inline-block";
    document.getElementById("titleDiv")!.style.width="67.5%";

    htmlString+=`<div class="cardDetail">
    <img src="${event.path[2].children[0].attributes[0].nodeValue}" class="image" alt="...">
      <div class="card-body">
        <h2 class="detailTitle">${event.path[1].children[0].innerHTML}</h2>
        <h3 class="detailSubtitle">${event.path[1].children[2].innerHTML}</h3>
        <p class="card-text" id="fullText">${event.path[1].children[3].innerHTML}</p>
      </div>
    </div>

    <div class="mail">
      <a href="mailto:${event.path[1].children[4].children[0].innerHTML}" id="contact">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <title>mail2</title>
      <path d="M26.667 0h-21.333c-2.934 0-5.334 2.4-5.334 5.334v21.332c0 2.936 2.4 5.334 5.334 5.334h21.333c2.934 0 5.333-2.398 5.333-5.334v-21.332c0-2.934-2.399-5.334-5.333-5.334zM26.667 4c0.25 0 0.486 0.073 0.688 0.198l-11.355 9.388-11.355-9.387c0.202-0.125 0.439-0.198 0.689-0.198h21.333zM5.334 28c-0.060 0-0.119-0.005-0.178-0.013l7.051-9.78-0.914-0.914-7.293 7.293v-19.098l12 14.512 12-14.512v19.098l-7.293-7.293-0.914 0.914 7.051 9.78c-0.058 0.008-0.117 0.013-0.177 0.013h-21.333z"></path>
      </svg>
      Contacteer ${event.path[1].children[2].innerHTML}</a>
    </div>`

    clusters!.insertAdjacentHTML("afterend",htmlString);
    document.getElementById('fullText')!.style.overflow="visible";
    document.getElementById('fullText')!.style.display="block";
  }

  back(){
    window.location.href="./showroom";
  }

  ngOnInit(): void {
    this.loadProjects();
    this.addEventListeners();
  }

}
