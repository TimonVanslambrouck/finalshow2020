import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileComponent } from './mobile.component';
import { LivestreamComponent } from './livestream/livestream.component';



@NgModule({
  declarations: [
    MobileComponent,
    LivestreamComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MobileModule { }
