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
            <h3 class="card-subtitle">${project.username}</h3>
            <p class="card-text">${project.description}</p>
            <a href="${project.url}" class="btn">See Project</a>
          </div>
          </div>`
        break;
        case "motion":
        this.motion +=`<div class="card">
          <img src="${project.images}" class="image" alt="...">
          <div class="card-body">
            <h2 class="card-title">${project.name}</h2>
            <h3 class="card-subtitle">${project.username}</h3>
            <p class="card-text">${project.description}</p>
            <a href="${project.url}" class="btn">See Project</a>
          </div>
          </div>`
        break;
        case "ar":
        this.ar +=`<div class="card">
          <img src="${project.images}" class="image" alt="...">
          <div class="card-body">
            <h2 class="card-title">${project.name}</h2>
            <h3 class="card-subtitle">${project.username}</h3>
            <p class="card-text">${project.description}</p>
            <a href="${project.url}" class="btn">See Project</a>
          </div>
          </div>`
        break;
        case "digital-making":
        this.digital_making +=`<div class="card">
          <img src="${project.images}" class="image" alt="...">
          <div class="card-body">
            <h2 class="card-title">${project.name}</h2>
            <h3 class="card-subtitle">${project.username}</h3>
            <p class="card-text">${project.description}</p>
            <a href="${project.url}" class="btn">See Project</a>
          </div>
          </div>`
        break;
        case "mobile":
        this.mobile +=`<div class="card">
          <img src="${project.images}" class="image" alt="...">
          <div class="card-body">  
            <h2 class="card-title">${project.name}</h2>
            <h3 class="card-subtitle">${project.username}</h3>
            <p class="card-text">${project.description}</p>
            <a href="${project.url}" class="btn">See Project</a>
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
  }

  ngOnInit(): void {
    this.loadProjects();
  }

}
