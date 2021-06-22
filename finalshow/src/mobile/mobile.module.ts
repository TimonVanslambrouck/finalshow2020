import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileComponent } from './mobile.component';
import { ShowroomComponent } from './showroom/showroom.component';
import { BackgroundComponent } from './background/background.component';
import { LivestreamComponent } from './livestream/livestream.component';
import { MenuComponent } from './menu/menu.component';
import { PreloaderComponent } from './preloader/preloader.component';



@NgModule({
  declarations: [
    MobileComponent,
    ShowroomComponent,
    BackgroundComponent,
    LivestreamComponent,
    MenuComponent,
    PreloaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class MobileModule { }
