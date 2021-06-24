//@ts-nocheck
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.scss']
})
export class ShowroomComponent implements OnInit {

  constructor() { }

  goTo2D(){
    document.getElementById('linkTo2D')?.addEventListener('click', function(){
      window.location.href = '/hub';
    })
  }

  ngOnInit() {
    this.goTo2D();
    var menubuttons = document.querySelectorAll("button");
    var menucluster = "web";
    menubuttons.forEach(button => {
      button.addEventListener("click", function(){
          menucluster = button.classList[0];
          console.log(menucluster);
          localStorage.setItem("cluster", menucluster);
          window.location.href = "/no-webgl"
      })
    })

  
    //API call

    const api_url = "https://finalshowcase.herokuapp.com/final-work/get-all";

    var buttons = document.querySelectorAll(".bottom-menu a");
    var cluster = localStorage.getItem("cluster")||"web";
    document.querySelector(`a.${cluster}`).classList.add("active");
    buttons.forEach(button => {
        button.addEventListener("click", function(){
            cluster = button.classList[0];
            button.classList.add("active");
            var children = [].slice.call(button.parentNode.children);
            children.forEach(child => {
                if(child.classList[0] != cluster) {
                    child.classList.remove("active");
                }
            });
            getapi(api_url);
        })
    });



    async function getapi(url) {
        const response = await fetch(url);
    
        var data = await response.json();

        show(data);

    }

    getapi(api_url);

    //Na API Call alle projecten inladen, rangschikken per cluster en deze printen adhv keuze gebruiker

    function show(data) {
        var started = false;
        var projecten = data.filter(p => p.cluster == cluster);
        Array.prototype.next = function() {

            return this[++this.current];

        };
        Array.prototype.prev = function() {
            return this[--this.current];
        };
        Array.prototype.current = 0;
        document.querySelector(".hoeveelheid").innerHTML = `${projecten.current+1}/${projecten.length}`;
        var project = projecten[0];
        var nextProject = document.querySelector(".right");
        var previousProject = document.querySelector(".left");
        nextProject.addEventListener("click", function(){
        
            if (projecten.length-1 == projecten.current){
                projecten.current = -1;
            }
            project = projecten.next();


            document.querySelector(".hoeveelheid").innerHTML = `${projecten.current+1}/${projecten.length}`;
            console.log("text");
            let htmlString =`
            <img class="coverphoto" src="${project.images}">`;
            if(false){
                htmlString += `
                <img src="../../assets/images/flagwinnerNoWEBGL.svg" class="showroomflag-winner" alt="...">`
              }else if(true){
                htmlString += `
                <img src="../../assets/images/flagnomineeNoWEBGL.svg" class="showroomflag-nominee" alt="...">`
              }; 
              htmlString += `   
            <h2>${project.name}</h2>
            <a href="mailto:${project.email}"><h3>${project.username}</h3></a>
            <h4>Beschrijving</h4>
            <p>${project.description}<br><br><a id="projectvideo" target="_blank" href="${project.url}">Bekijk de projectvideo</a></p>
            `;
            document.querySelector(".projecten").innerHTML = htmlString;
        });
        previousProject.addEventListener("click", function(){
            if (projecten.current == 0){
                projecten.current = projecten.length;
            }
            project = projecten.prev();
            document.querySelector(".hoeveelheid").innerHTML = `${projecten.current+1}/${projecten.length}`;
            console.log("text");
            let htmlString =`
            <img class="coverphoto" src="${project.images}">`;
            if(false){
                htmlString += `
                <img src="../../assets/images/flagwinnerNoWEBGL.svg" class="showroomflag-winner" alt="...">`
              }else if(true){
                htmlString += `
                <img src="../../assets/images/flagnomineeNoWEBGL.svg" class="showroomflag-nominee" alt="...">`
              }; 
              htmlString +=   `
            <h2>${project.name}</h2>
            <a href="mailto:${project.email}"><h3>${project.username}</h3></a>
            <h4>Beschrijving</h4>
            <p>${project.description}<br><br><a id="projectvideo" target="_blank" href="${project.url}">Bekijk de projectvideo</a></p>
            `;
            document.querySelector(".projecten").innerHTML = htmlString;
        });
      
      
        if(!started) {
            let htmlString =`
            <img class="coverphoto" src="${project.images}">`;
            if(true){
                htmlString += `
                <img src="../../assets/images/flagwinnerNoWEBGL.svg" class="showroomflag-winner" alt="...">`
              }else if(false){
                htmlString += `
                <img src="../../assets/images/flagnomineeNoWEBGL.svg" class="showroomflag-nominee" alt="...">`
              }; 
              htmlString += `   
            <h2>${project.name}</h2>
            <a href="mailto:${project.email}"><h3>${project.username}</h3></a>
            <h4>Beschrijving</h4>
            <p>${project.description}<br><br><a id="projectvideo" target="_blank" href="${project.url}">Bekijk de projectvideo</a></p>
            `;
            document.querySelector(".projecten").innerHTML = htmlString;
            started = true;
        }
    }
  }

}
