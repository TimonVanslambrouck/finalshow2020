import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileComponent } from './mobile.component';
import { LivestreamComponent } from './livestream/livestream.component';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [
    MobileComponent,
    LivestreamComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class MobileModule { }
