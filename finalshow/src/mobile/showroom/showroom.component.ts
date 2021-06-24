import { Component, OnInit } from '@angular/core';
import { Audio } from 'three';

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

  async fetchProjects(): Promise<Response>{
    const req = await fetch("https://finalshowcase.herokuapp.com/final-work/get-all");
    return await req.json();
  }

  async fetchSingleProject(project: String): Promise<Response>{
    const req = await fetch(`http://193.191.183.48:3000/final-work/search-name/${project}`);
    return await req.json();
  }

  async fetchNominees(): Promise<Response> {
    const req = await fetch('http://193.191.183.48:3000/admin/get-nominations');
    return await req.json();
  }

  loadProjects(){
    this.fetchProjects().then((data: any)=>{
      this.fetchNominees().then((nominees) => {
      this.sortProjects(data, nominees);
      })
    });
  }

  loadSingleProject(project: String) {
    this.fetchSingleProject(project).then((data: any) => {
      this.page(data[0])
    })
  }

  sortProjects(data: any, nominees: any){
    console.log(nominees);
    data.forEach((project: any) => {
      let htmlString: String = `
      <div class="card">
        <div class="card-image-container">
        `;
         if(false){
          htmlString += `
          <img src="../../assets/images/flagwinner.svg" class="flag" alt="...">
          <h5 class="flag-text">Winnaar</h5>`
        }else if(true){
          htmlString += `
          <img src="../../assets/images/flagnominee.svg" class="flag flagnominee" alt="...">
          <h5 class="flag-text nominee">genomineerd</h5>`
        };
        htmlString += `
        <img src="${project.images}" class="card-image" alt="...">
        </div>        
        <div class="card-body">
          <div class="card-body-info">
            <h2 class="card-title">${project.name}</h2>
            <h3 class="card-subtitle">${project.username}</h3>
          </div>
          <div class="card-body-more">
            <a class="card-btn"><img class="arrow" src="../../src/assets/images/arrow.svg"></a>
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

  clusters(event: any){
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
    this.addEventListeners();
  }

  addEventListeners(){
    const buttons = document.getElementsByClassName("card-btn");
      setTimeout(() => {
        for(let i = 0;i < buttons.length;i++){
          buttons[i].addEventListener("click", (event) => {
            //@ts-ignore
            const projectName: String = event.path[3].children[0].children[0].innerText;
            this.loadSingleProject(projectName);
          })
        }
      }, 400);
  }

  page(project: any){
    console.log(project);

    let htmlString = "";
    document.getElementById("clusters-container")!.style.display="none";
    document.getElementById("showcase")!.style.display="none";
    document.getElementById("back")!.style.display="flex";
    const userFirstName : String = project.username.split(' ')[0];

    htmlString+=`<div class="card card-detail">
        <div class="card-image-container">
          <img src="${project.images}" class="card-image" alt="...">
        </div>
        <div class="card-body">
          <div class="card-body-info">
            <h2 class="card-title">${project.name}</h2>
            <h3 class="card-subtitle">${project.username}</h3>
          </div>
          <div class="card-body-more">
            <a class="card-mail" href="mailto:${project.email}">Contacteer ${userFirstName}</a>
          </div>
        </div>
        <p class="detail-desc">
          ${project.description} <br><br>
          <a class="card-video" href="${project.url}">Bekijk de projectvideo</a>
        </p>
      </div>`

    document.getElementById("clusters-container")!.insertAdjacentHTML("afterend",htmlString);
  }

  back(){
    document.getElementById("clusters-container")!.style.display="flex";
    document.getElementById("back")!.style.display="none";
    document.getElementById("showcase")!.style.display="block";
    document.getElementById('fullText')!.style.overflow="invisible";
    document.getElementById('fullText')!.style.display="none";
    document.getElementById('card-detail')!.style.display="none";
    document.getElementById('mail')!.style.display="none";
  }

  ngOnInit(): void {
    this.loadProjects();
    this.addEventListeners();
  }

}
