import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CounterActions } from './counter.handlers';
import { ComponentFeatures, withActions, withSelectors } from 'component-features';

@Component({
  selector: 'sc-counter',
  template: `
    <h2>Counter</h2>
    <button class="buffer-right" (click)="actions.increment()">Increment</button>
    <button class="buffer-right" (click)="actions.decrement()">Decrement</button>
    <button (click)="actions.reset()">Reset</button>
    <p>Value: {{ count }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@ComponentFeatures([withSelectors({ count: 'counter' }), withActions(CounterActions)])
export class CounterComponent {
  count!: number;
  actions!: typeof CounterActions;
}
