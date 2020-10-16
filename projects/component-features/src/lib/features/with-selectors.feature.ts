import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { skip, takeUntil, tap } from 'rxjs/operators';
import { Feature, LifecycleHook } from '../models';
import { createFeature } from '../create-feature';

type SelectorFn = (state: any) => any;

interface Selectors {
  [propertyName: string]: SelectorFn | string;
}

export function withSelectors(selectors: Selectors): Feature {
  const destroy = new Subject();

  const ngOnInit: LifecycleHook = ({ component, inject, markDirty }) => {
    const store = inject(Store);
    Object.keys(selectors).forEach(propertyName =>
      store
        .select(selectors[propertyName] as SelectorFn)
        .pipe(
          tap(selectedState => (component[propertyName] = selectedState)),
          skip(1),
          takeUntil(destroy),
        )
        .subscribe(() => markDirty(component)),
    );
  };

  const ngOnDestroy = () => destroy.next();

  return createFeature({ ngOnInit, ngOnDestroy });
}
