import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoWebglComponent } from './no-webgl.component';
import { ShowroomComponent } from './showroom/showroom.component';
import { LivestreamComponent } from './livestream/livestream.component';
import { NoWebglRoutingModule } from './no-webgl-routing.module';
import { TimetableComponent } from './timetable/timetable.component';
import { FaqComponent } from './faq/faq.component'; 

@NgModule({
  imports: [
    CommonModule,
    NoWebglRoutingModule,
  ],
  declarations: [
    NoWebglComponent,
    ShowroomComponent,
    LivestreamComponent,
    TimetableComponent,
    FaqComponent,
  ]
})
export class NoWebglModule { }
