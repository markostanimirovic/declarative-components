import { ɵComponentDef } from '@angular/core';

export type Feature = (componentDef: ɵComponentDef<any>) => void;

export type SelectorFn = (state: any) => any;

export interface SelectorMap {
  [propertyName: string]: SelectorFn | string;
}
