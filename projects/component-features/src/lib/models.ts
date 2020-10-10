import { ɵComponentDef, ɵdetectChanges, ɵmarkDirty, ɵɵdirectiveInject } from '@angular/core';

export type Feature = (componentDef: ɵComponentDef<unknown>) => void;

export interface LifecycleHookProviders {
  component: any;
  inject: typeof ɵɵdirectiveInject;
  markDirty: typeof ɵmarkDirty;
  detectChanges: typeof ɵdetectChanges;
}

export interface LifecycleHooks {
  ngOnChanges?(providers: LifecycleHookProviders): void;
  ngOnInit?(providers: LifecycleHookProviders): void;
  ngDoCheck?(providers: LifecycleHookProviders): void;
  ngAfterContentInit?(providers: LifecycleHookProviders): void;
  ngAfterContentChecked?(providers: LifecycleHookProviders): void;
  ngAfterViewInit?(providers: LifecycleHookProviders): void;
  ngAfterViewChecked?(providers: LifecycleHookProviders): void;
  ngOnDestroy?(providers: LifecycleHookProviders): void;
}
