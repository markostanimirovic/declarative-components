import { Action, ActionCreator, Store } from '@ngrx/store';
import { ɵɵdirectiveInject, ɵComponentDef } from '@angular/core';
import { Feature } from './models';

export function withActions(actions: { [key: string]: ActionCreator }): Feature {
  return (componentDef: ɵComponentDef<any>) => {
    const originalNgOnInit = componentDef.type.prototype.ngOnInit;

    componentDef.type.prototype.ngOnInit = function () {
      const store = ɵɵdirectiveInject(Store);

      this.actions = Object.keys(actions).reduce(
        (acc, key) => ({
          ...acc,
          [key]: (payload: any) => store.dispatch(actions[key](payload) as Action),
        }),
        {},
      );

      if (originalNgOnInit) {
        originalNgOnInit.call(this);
      }
    };
  };
}
