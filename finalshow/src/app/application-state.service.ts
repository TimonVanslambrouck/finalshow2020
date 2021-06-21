// https://betterprogramming.pub/creating-angular-webapp-for-multiple-views-and-screen-sizes-50fe8a83c433

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateService {
  private isMobileResolution: boolean;

  constructor() { 
    window.innerWidth < 1025 ? this.isMobileResolution = true : this.isMobileResolution = false;
  }

  public getIsMobileResolution(): boolean {
    return this.isMobileResolution;
  }

}
