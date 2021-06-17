import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AnimationComponent } from './animation.component';

import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
import { LoadingComponent } from './loading/loading.component';
import { SkyboxComponent } from './skybox/skybox.component';
import { AnimatedTextComponent } from './animated-text/animated-text.component';
import { SoundComponent } from './sound/sound.component';
import { LightComponent } from './light/light.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
  ],
  declarations: [
    AnimationComponent,
    LoadingComponent,
    CountdownTimerComponent,
    SkyboxComponent,
    AnimatedTextComponent,
    SoundComponent,
    LightComponent,
  ]
})
export class AnimationModule { }
