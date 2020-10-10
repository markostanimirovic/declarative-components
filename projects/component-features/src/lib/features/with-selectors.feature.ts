import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
        .pipe(takeUntil(destroy))
        .subscribe(selectedValue => {
          component[propertyName] = selectedValue;
          markDirty(component);
        }),
    );
  };

  const ngOnDestroy = () => destroy.next();

  return createFeature({ ngOnInit, ngOnDestroy });
}
