import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
import { LoadingComponent } from './loading/loading.component';
import { SkyboxComponent } from './skybox/skybox.component';
import { AnimatedTextComponent } from './animated-text/animated-text.component';
import { SoundComponent } from './sound/sound.component';
import { LightComponent } from './light/light.component';
import { ScrollAnimationComponent } from './scroll-animation/scroll-animation.component';

@NgModule({
  declarations: [	
    AppComponent,
    LoadingComponent,
    CountdownTimerComponent,
    SkyboxComponent,
    AnimatedTextComponent,
    SoundComponent,
    LightComponent,
    ScrollAnimationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
