import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.scss']
})
export class SoundComponent implements OnInit {

  constructor() { }

  addSound(scene:any,camera:any){
    const audioLoader = new THREE.AudioLoader();
    const listener = new THREE.AudioListener();
		camera.add( listener );

    const sound1 = new THREE.PositionalAudio( listener );
				audioLoader.load( '../assets/sounds/sound.ogg', function ( buffer ) {
					sound1.setBuffer( buffer );
					sound1.setRefDistance( 20 );
          sound1.setLoop( true );
          sound1.setVolume( 0 );
					sound1.play();
          sound1.name = "sound";

				} );
				scene.add( sound1 );
  }

  ngOnInit(): void {
  }

}
