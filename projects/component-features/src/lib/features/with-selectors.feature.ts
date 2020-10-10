import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Feature } from '../models';
import { createFeature } from '../create-feature';

type SelectorFn = (state: any) => any;

interface Selectors {
  [propertyName: string]: SelectorFn | string;
}

export function withSelectors(selectors: Selectors): Feature {
  const destroy = new Subject();

  return createFeature({
    ngOnInit: ({ component, inject, markDirty }) => {
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
    },
    ngOnDestroy: () => destroy.next(),
  });
}