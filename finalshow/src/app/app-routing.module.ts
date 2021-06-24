import { FaqComponent } from './../mobile/faq/faq.component';
// https://betterprogramming.pub/creating-angular-webapp-for-multiple-views-and-screen-sizes-50fe8a83c433

import { NgModule } from '@angular/core';
import { PreloadAllModules, Router, RouterModule, Routes } from '@angular/router';
import { HubComponent } from 'src/hub/hub.component';
import { AnimationComponent } from 'src/animation/animation.component';
import { MobileComponent } from 'src/mobile/mobile.component'; 
import { ApplicationStateService } from './application-state.service';
import { ShowroomComponent } from 'src/mobile/showroom/showroom.component';
import { PreloaderComponent } from 'src/mobile/preloader/preloader.component';

const desktop_routes: Routes = [
  { path: '', component: AnimationComponent },
  { path: 'hub', component: HubComponent },
  { path: 'no-webgl', loadChildren: () => import('../no-webgl/no-webgl.module').then(m => m.NoWebglModule) },
];

const mobile_routes: Routes = [
  { path: '', component: PreloaderComponent },
  { path: 'livestream', component: MobileComponent },
  { path: 'showroom', component: ShowroomComponent },
  { path: 'faq', component: FaqComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(desktop_routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  public constructor(private router: Router,
    private applicationStateService: ApplicationStateService) {

    if (applicationStateService.getIsMobileResolution()) {
      router.resetConfig(mobile_routes);
    }
  }
}
