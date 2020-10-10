import { ɵComponentDef, ɵdetectChanges, ɵmarkDirty, ɵɵdirectiveInject } from '@angular/core';

export type Feature = (componentDef: ɵComponentDef<unknown>) => void;

export interface LifecycleHookProviders {
  component: any;
  inject: typeof ɵɵdirectiveInject;
  markDirty: typeof ɵmarkDirty;
  detectChanges: typeof ɵdetectChanges;
}

export type LifecycleHook = (providers: LifecycleHookProviders) => void;

export interface LifecycleHooks {
  ngOnChanges?: LifecycleHook;
  ngOnInit?: LifecycleHook;
  ngDoCheck?: LifecycleHook;
  ngAfterContentInit?: LifecycleHook;
  ngAfterContentChecked?: LifecycleHook;
  ngAfterViewInit?: LifecycleHook;
  ngAfterViewChecked?: LifecycleHook;
  ngOnDestroy?: LifecycleHook;
}
