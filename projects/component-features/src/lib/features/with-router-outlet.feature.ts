import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Feature, LifecycleHook } from '../models';
import { NavigationEnd, Router } from '@angular/router';
import { createFeature } from '../create-feature';

export function withRouterOutlet(): Feature {
  const destroy = new Subject();

  const ngOnInit: LifecycleHook = ({ component, inject, detectChanges }) => {
    const router = inject(Router);
    router.events.pipe(takeUntil(destroy)).subscribe((event: unknown) => {
      if (event instanceof NavigationEnd) detectChanges(component);
    });
  };

  const ngOnDestroy = () => destroy.next();

  return createFeature({ ngOnInit, ngOnDestroy });
}
