import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AnimationComponent } from './animation.component';

import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
import { SkyboxComponent } from './skybox/skybox.component';
import { AnimatedTextComponent } from './animated-text/animated-text.component';
import { SoundComponent } from './sound/sound.component';
import { LightComponent } from './light/light.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],
  declarations: [
    AnimationComponent,
    CountdownTimerComponent,
    SkyboxComponent,
    AnimatedTextComponent,
    SoundComponent,
    LightComponent,
    LoadingComponent,
  ]
})
export class AnimationModule { }
