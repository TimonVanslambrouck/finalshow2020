//@ts-nocheck
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {

  constructor() { }

  goTo2D(){
    document.getElementById('linkTo2D')?.addEventListener('click', function(){
      window.location.href = '/hub';
    })
  }

  ngOnInit() {
    this.goTo2D();
    //Script voor divs te doen verschijnen doormiddel van het klikken van één van de timetable evenementen in timetable.html
    var timetablebuttons = document.querySelectorAll(".item");
    timetablebuttons.forEach(button => {
    button.addEventListener("click",function(){
        var showEvent = button.classList[1];

        var children = [].slice.call(button.parentNode.children);
        children.forEach(child => {
            if(child.classList[0] != showEvent) {
                child.classList.remove("active");
                button.classList.add("active");
            }
        });

        var siblings = document.querySelectorAll(".timetableevent");
        siblings.forEach(sibling => {
            if(sibling.classList[0] != showEvent) {
                sibling.style.display ='none';
                
            }
            else {
                sibling.style.display ='block';
            }
        });
        
    })

  })
  }

}
