import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HubComponent } from 'src/hub/hub.component';
import { AnimationComponent } from 'src/animation/animation.component';

const routes: Routes = [
  { path: '', component: AnimationComponent },
  { path: 'hub', component: HubComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
