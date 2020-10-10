import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Feature } from '../models';
import { NavigationEnd, Router } from '@angular/router';
import { createFeature } from '../create-feature';

export function withRouterOutlet(): Feature {
  const destroy = new Subject();

  return createFeature({
    ngOnInit: ({ component, inject, detectChanges }) => {
      const router = inject(Router);
      router.events.pipe(takeUntil(destroy)).subscribe((event: unknown) => {
        if (event instanceof NavigationEnd) detectChanges(component);
      });
    },
    ngOnDestroy: () => destroy.next(),
  });
}
