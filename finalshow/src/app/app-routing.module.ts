import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HubComponent } from 'src/hub/hub.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'hub', component: HubComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
