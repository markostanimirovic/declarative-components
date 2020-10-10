import { ɵComponentDef, ɵdetectChanges, ɵmarkDirty, ɵɵdirectiveInject } from '@angular/core';
import { Feature, LifecycleHooks } from './models';

export function createFeature(hooks: LifecycleHooks): Feature {
  return (componentDef: ɵComponentDef<unknown>) => {
    Object.keys(hooks).forEach(hookName => {
      const originalHook = componentDef.type.prototype[hookName];
      componentDef.type.prototype[hookName] = function () {
        hooks[hookName as keyof LifecycleHooks]!({
          component: this,
          inject: ɵɵdirectiveInject,
          markDirty: ɵmarkDirty,
          detectChanges: ɵdetectChanges,
        });

        if (originalHook) originalHook.call(this);
      };
    });
  };
}
