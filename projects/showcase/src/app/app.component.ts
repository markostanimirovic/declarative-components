import { ChangeDetectionStrategy, Component, OnInit, ɵdetectChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'sc-root',
  template: `
    <div class="buffer-bottom">
      <a class="buffer-right" routerLink="/movies">Movies</a>
      <a routerLink="/counter">Counter</a>
    </div>
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event: unknown) => {
      if (event instanceof NavigationEnd) {
        ɵdetectChanges(this);
      }
    });
  }
}
