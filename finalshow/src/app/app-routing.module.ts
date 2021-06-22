// https://betterprogramming.pub/creating-angular-webapp-for-multiple-views-and-screen-sizes-50fe8a83c433

import { NgModule } from '@angular/core';
import { PreloadAllModules, Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HubComponent } from 'src/hub/hub.component';
import { AnimationComponent } from 'src/animation/animation.component';
import { MobileComponent } from 'src/mobile/mobile.component'; 
import { ApplicationStateService } from './application-state.service';
import { LivestreamComponent } from 'src/mobile/livestream/livestream.component';
import { ShowroomComponent } from 'src/mobile/showroom/showroom.component';
import { PreloaderComponent } from 'src/mobile/preloader/preloader.component';

const desktop_routes: Routes = [
  { path: '', component: AnimationComponent },
  { path: 'hub', component: HubComponent },
  { path: 'mobile', component: MobileComponent },
];

const mobile_routes: Routes = [
  { path: '', component: PreloaderComponent },
  { path: 'livestream', component: MobileComponent },
  { path: 'showroom', component: ShowroomComponent },
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
