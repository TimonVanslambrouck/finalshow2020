import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HubComponent } from './hub.component';
import { LightsComponent } from './lights/lights.component';
import { LoadingComponent } from './loading/loading.component';
import { PopupComponent } from './popup/popup.component';
import { LivestreamComponent } from './livestream/livestream.component';
import { PoiComponent } from './poi/poi.component';
import { AnimationsComponent } from './animations/animations.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    HubComponent,
    LightsComponent,
    LoadingComponent,
    PopupComponent,
    LivestreamComponent,
    PoiComponent,
    AnimationsComponent
  ]
})
export class HubModule { }
