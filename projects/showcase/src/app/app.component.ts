import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFeatures, withRouterOutlet } from 'component-features';

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
@ComponentFeatures([withRouterOutlet()])
export class AppComponent {}
