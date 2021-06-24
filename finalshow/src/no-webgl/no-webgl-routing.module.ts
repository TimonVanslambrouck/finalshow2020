import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowroomComponent } from './showroom/showroom.component';
import { LivestreamComponent } from './livestream/livestream.component';
import { TimetableComponent } from './timetable/timetable.component';
import { FaqComponent } from './faq/faq.component'; 

const routes: Routes = [
  { path: '', component: ShowroomComponent },
  { path: 'livestream', component: LivestreamComponent },
  { path: 'timetable', component: TimetableComponent },
  { path: 'faq', component: FaqComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoWebglRoutingModule { }