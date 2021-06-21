import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HubComponent } from 'src/hub/hub.component';
import { AnimationComponent } from 'src/animation/animation.component';
import { MobileComponent } from 'src/mobile/mobile.component';

const routes: Routes = [
  { path: '', component: AnimationComponent },
  { path: 'hub', component: HubComponent },
  { path: 'mobile', component: MobileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
