import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SkyComponent } from './sky/sky.component';
import { ScrollAnimationComponent } from './scroll-animation/scroll-animation.component';

@NgModule({
  declarations: [
    AppComponent,
    SkyComponent,
    ScrollAnimationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
