import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HubComponent } from './hub.component';
import { LightsComponent } from './lights/lights.component';
import { RoomComponent } from './room/room.component';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    HubComponent,
    LightsComponent,
    RoomComponent,
    PopupComponent
  ]
})
export class HubModule { }
