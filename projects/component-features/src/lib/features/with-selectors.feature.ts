import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { skip, take, takeUntil } from 'rxjs/operators';
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
    Object.keys(selectors).forEach(propertyName => {
      const selectedState$ = store.select(selectors[propertyName] as SelectorFn);

      selectedState$
        .pipe(take(1))
        .subscribe(selectedState => (component[propertyName] = selectedState));
      selectedState$.pipe(skip(1), takeUntil(destroy)).subscribe(selectedState => {
        component[propertyName] = selectedState;
        markDirty(component);
      });
    });
  };

  const ngOnDestroy = () => destroy.next();

  return createFeature({ ngOnInit, ngOnDestroy });
}
