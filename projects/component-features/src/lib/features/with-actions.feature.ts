import { Action, ActionCreator, Store } from '@ngrx/store';
import { Feature } from '../models';
import { createFeature } from '../create-feature';

interface Actions {
  [actionName: string]: ActionCreator;
}

export function withActions(actions: Actions): Feature {
  return createFeature({
    ngOnInit({ component, inject }) {
      const store = inject(Store);
      component.actions = Object.keys(actions).reduce(
        (acc, key) => ({
          ...acc,
          [key]: (payload: unknown) => store.dispatch(actions[key](payload) as Action),
        }),
        {},
      );
    },
  });
}
