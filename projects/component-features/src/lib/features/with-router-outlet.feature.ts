import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Feature, LifecycleHook } from '../models';
import { NavigationEnd, Router } from '@angular/router';
import { createFeature } from '../create-feature';

export function withRouterOutlet(): Feature {
  const destroy = new Subject();

  const ngOnInit: LifecycleHook = ({ component, inject, markDirty }) => {
    const router = inject(Router);
    router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        takeUntil(destroy),
      )
      .subscribe(() => markDirty(component));
  };

  const ngOnDestroy = () => destroy.next();

  return createFeature({ ngOnInit, ngOnDestroy });
}
