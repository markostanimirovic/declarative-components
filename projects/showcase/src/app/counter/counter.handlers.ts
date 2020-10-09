import { combineHandlers } from 'ngrx-handlers';

export const featureName = 'counter';

const initialState = 0;

export const { actions: CounterActions, reducer } = combineHandlers(initialState, featureName, {
  increment: state => state + 1,
  decrement: state => state - 1,
  reset: () => initialState,
});
