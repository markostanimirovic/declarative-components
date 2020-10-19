# Declarative and Zone-Less Angular Components With Ivy Features and NgRx

## TLDR; What's the goal?

To transform this:

```typescript
@Component({
  selector: 'app-counter',
  template: `
    <h2>Counter</h2>
    <button (click)="onIncrement()">Increment</button>
    <button (click)="onDecrement()">Decrement</button>
    <button (click)="onReset()">Reset</button>
    <p>Value: {{ count$ | async }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  count$ = this.store.select(selectCount);

  constructor(private store: Store<{ counter: number }>) {}

  onIncrement() {
    this.store.dispatch(CounterActions.increment());
  }

  onDecrement() {
    this.store.dispatch(CounterActions.decrement());
  }

  onReset() {
    this.store.dispatch(CounterActions.reset());
  }
}
```

into this:

```typescript
@Component({
  selector: 'app-counter',
  template: `
    <h2>Counter</h2>
    <button (click)="actions.increment()">Increment</button>
    <button (click)="actions.decrement()">Decrement</button>
    <button (click)="actions.reset()">Reset</button>
    <p>Value: {{ count }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@ComponentFeatures([withSelectors({ count: selectCount }), withActions(CounterActions)])
export class CounterComponent {
  count!: number;
  actions!: typeof CounterActions;
}
```

Okay, let's start step by step. 🙂

## Introduction

Let's first recap the concepts that are important for this article.

### What is Zone.js?

**Disadvantages**
- Tree shaking -> Bundle size
- Application bootstrap speed
- Performance -> Unneccessary rerendering

**markDirty**

### What are Ivy features?

**UNDER_CONSTRUCTION**
