import { Action, ActionCreator, Store } from '@ngrx/store';
import { Feature, LifecycleHook } from '../models';
import { createFeature } from '../create-feature';

interface Actions {
  [actionName: string]: ActionCreator;
}

export function withActions(actions: Actions): Feature {
  const ngOnInit: LifecycleHook = ({ component, inject }) => {
    const store = inject(Store);
    component.actions = Object.keys(actions).reduce(
      (acc, actionName) => ({
        ...acc,
        [actionName]: (payload: unknown) => store.dispatch(actions[actionName](payload) as Action),
      }),
      {},
    );
  };

  return createFeature({ ngOnInit });
}
