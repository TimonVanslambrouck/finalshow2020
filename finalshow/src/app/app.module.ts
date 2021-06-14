import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollAnimationComponent } from './scroll-animation/scroll-animation.component';
import { FlightAnimationComponent } from './flight-animation/flight-animation.component';
import { SkyComponent } from './sky/sky.component';

@NgModule({
  declarations: [	
    AppComponent,
    SkyComponent,
    ScrollAnimationComponent,
    FlightAnimationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
