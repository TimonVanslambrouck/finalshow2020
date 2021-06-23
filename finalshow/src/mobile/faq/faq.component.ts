import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faqObject:any[] =  
    [{
      title: 'Wat is de Final Show?',
      description: 'De Final Show is een evenement waar eindejaarsstudenten van de opleiding Multimedia & Communicatietechnologie aan de Erasmushogeschool Brussel in de spotlight worden gezet. Hier kunnen ze tonen waar ze de voorbije maanden mee bezig zijn geweest. Dit is ook de ideale gelegenheid om contacten te leggen tussen werkgevers en potentiële werknemers'
    },
    {
      title: 'Hoe zal de Final Show doorgaan?',
      description: 'Dit jaar zal de Final Show te zien zijn via een livestream. De livestream kan je bekijken zonder een account aan te maken.'
    },
    {
      title: 'Waarom hapert de livestream?',
      description: 'Een stabiele internetconnectie is nodig om de livestream vloeiend te kunnen bekijken. Sluit ook onnodige openstaande tabs af, dit kan uw toestel en dus de stream vertragen.'
    },
    {
      title: 'Waar vind ik meer info over de opleiding?',
      description: 'Meer info hierover kan je op de website van EHB vinden.'
    },
    {
      title: 'Hoe kan ik de school contacteren?',
      description: 'Meer info hierover kan je op de website van EHB vinden.'
    }]
  

  constructor() { }

  ngOnInit(): void {
  }

}
