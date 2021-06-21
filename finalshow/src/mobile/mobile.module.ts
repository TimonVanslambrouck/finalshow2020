import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileComponent } from './mobile.component';
import { ShowroomComponent } from './showroom/showroom.component';
import { BackgroundComponent } from './background/background.component';



@NgModule({
  declarations: [
    MobileComponent,
    ShowroomComponent,
    BackgroundComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MobileModule { }
