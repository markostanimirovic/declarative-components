# Declarative and Zone-Less Angular Components With Ivy Features and NgRx

## TLDR; What's the goal?

To transform this:

<img src="https://i.ibb.co/BPhYZkx/counter-component-before.png" alt="counter-component-before">

into this:

<img src="https://i.ibb.co/5vQ1zCT/counter-component-after.png" alt="counter-component-after">

## Introduction

Let's first recap the concepts that are important for this article.

### What is Zone.js?

Zone.js is a script that is executed before the Angular application is bootstrapped. It
<a href="https://www.audero.it/blog/2016/12/05/monkey-patching-javascript/#what-is-monkey-patching" target="_blank">monkey patches</a>
asynchronous browser APIs (e.g. `setTimeout`, `setInterval`, `addEventListener`, `Promise`) by adding the code that will tell the Angular when
to run change detection mechanism. You can check that by opening the console in your Angular app and running the following code:

<img src="https://i.ibb.co/9pc83YJ/zone-js-monkey-patching.png" alt="zone-js-monkey-patching">

Angular wrapps zone.js within the `NgZone` service. `ApplicationRef` injects it, listens to the `onMicrotaskEmpty` emitter and invokes
`tick` method that will rerender the views.

<img src="https://i.ibb.co/NYXxQ01/application-ref.png" alt="application-ref">

**Disadvantages**
- Tree shaking -> Bundle size
- Application bootstrap speed
- Performance -> Unneccessary rerendering



**markDirty**

### What are Ivy features?

**UNDER_CONSTRUCTION**
