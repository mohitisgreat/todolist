import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {NavService} from './nav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isHandset$: Observable<boolean> =
      this.breakpointObserver.observe(Breakpoints.Handset)
          .pipe(map(result => result.matches));

  navTitle$: Observable<string>;

  constructor(
      private breakpointObserver: BreakpointObserver,
      public navService: NavService) {
    this.navTitle$ = navService.navTitle.pipe(map(result => {
      if (!result || result.length === 0) {
        return 'Todo List';
      }
      return result;
    }));
  }
}
