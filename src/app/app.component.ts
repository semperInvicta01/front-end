import { Component } from '@angular/core';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

import { fadeAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[fadeAnimation],
  
})
export class AppComponent {

  title = 'app';

  // Sets initial value to true to show loading spinner on first load
  loading = true

  constructor(private _loadingBar: SlimLoadingBarService,private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
  }

  private navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }

    // Set loading state to false in both of the below events to hide the loader in case a request fails
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }

  getState(outlet:any):any {
    console.log(outlet.activatedRouteData.state);
    return outlet.activatedRouteData.state == undefined? 'active':'inactive';
  }
}
