import { ɵɵdirectiveInject, ɵComponentDef, ɵmarkDirty } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Feature, SelectorFn, SelectorMap } from './models';

export function withSelect(selectors: SelectorMap): Feature {
  return (componentDef: ɵComponentDef<any>) => {
    const destroy = new Subject();

    patchOnInit(componentDef, selectors, destroy);
    patchOnDestroy(componentDef, destroy);
  };
}

function patchOnInit(
  componentDef: ɵComponentDef<any>,
  selectors: SelectorMap,
  destroy: Subject<any>,
) {
  const originalOnInit = componentDef.type.prototype.ngOnInit;

  componentDef.type.prototype.ngOnInit = function () {
    const store: Store<any> = ɵɵdirectiveInject(Store);

    Object.keys(selectors).forEach(propertyName =>
      store
        .select(selectors[propertyName] as SelectorFn)
        .pipe(takeUntil(destroy))
        .subscribe(selectedValue => {
          this[propertyName] = selectedValue;
          ɵmarkDirty(this);
        }),
    );

    if (originalOnInit) originalOnInit.call(this);
  };
}

function patchOnDestroy(componentDef: ɵComponentDef<any>, destroy: Subject<any>) {
  const originalOnDestroy = componentDef.type.prototype.ngOnDestroy;

  componentDef.type.prototype.ngOnDestroy = function () {
    if (originalOnDestroy) originalOnDestroy.call(this);
    destroy.next();
  };
}
