//@ts-nocheck
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //Script voor divs te doen verschijnen doormiddel van het klikken van één van de FAQ vragen in FAQ.html
    var faqButtons = document.querySelectorAll(".items");
    faqButtons.forEach(button => {
   
    button.addEventListener("click",function(){
        var showEvent = button.classList[1];
        let childs = [].slice.call(button.parentNode.children);
        childs.forEach(child => {
            if(child.classList[1] != showEvent) {
                child.classList.remove("active");
                button.classList.add("active");
            }
        });
           let siblings = document.querySelectorAll(".results");
        siblings.forEach(sibling => {
            if(sibling.classList[1] != showEvent) {

                sibling.style.display ='none';
            }
            else {
                sibling.style.display ='block';
            }
        });
        
    })
  });
  }

}
