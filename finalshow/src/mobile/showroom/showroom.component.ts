import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.scss',]
})
export class ShowroomComponent implements OnInit {

  constructor() { }

  web = "";
  motion = "";
  ar = "";
  dm = "";
  mobile = "";

  async fetchProjects(){
    const req = await fetch("https://finalshowcase.herokuapp.com/final-work/get-all");
    const res = await req.json();
    return res;
  }

  loadProjects(){
    this.fetchProjects().then((data : any)=>{
      this.sortProjects(data)
    });
  }

  sortProjects(data : any){
    data.forEach((project : any) => {
      const htmlString : String = `
      <div class="card">
        <div class="card-image-container">
          <img src="${project.images}" class="card-image" alt="...">
        </div>
        <div class="card-body">
          <div class="card-body-info">
            <h2 class="card-title">${project.name}</h2>
            <h3 class="card-subtitle">${project.username}</h3>
          </div>
          <div class="card-body-more">
            <a class="card-btn">BEKIJK PROJECT</a>
            <div hidden>${project.email}</div>
          </div>
        </div>
      </div>`;

      if (project.cluster == "web")
        this.web += htmlString;
      else if (project.cluster == "motion")
        this.motion += htmlString;
      else if (project.cluster == "ar")
        this.ar += htmlString;
      else if (project.cluster == "digital-making")
        this.dm += htmlString;
      else
        this.mobile += htmlString;    
    });
  }

  clusters(event : any){
    let id = event.target.attributes.id.nodeValue;
    let showcase = document.getElementById("showcase");
    let center = document.getElementsByClassName("center")[0];
    center.classList.add("fade");
    center.classList.remove("center");

    if (id == "web")
      showcase!.innerHTML = this.web;
    else if (id == "motion")
      showcase!.innerHTML = this.motion;
    else if (id == "ar")
      showcase!.innerHTML = this.ar;
    else if (id == "digital-making")
      showcase!.innerHTML = this.dm;
    else
      showcase!.innerHTML = this.mobile;

    event.target.classList.remove("fade");
    event.target.classList.add("center");
  }

  addEventListeners(){

    const buttons = document.getElementsByClassName("card-btn");
      setTimeout(() => {
        for(let i=0;i<buttons.length;i++){
          buttons[i].addEventListener("click",this.page)
        }
      }, 400);

  }

  page(event:any){

    let htmlString="";
    let clusters=document.getElementById("clusters-container");

    console.log(event.path);

    clusters!.style.display="none";
    document.getElementById("showcase")!.style.display="none";
    document.getElementById("back")!.style.display="flex";

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
