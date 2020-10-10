import { Type, ɵComponentType } from '@angular/core';
import { Feature } from './models';

export function ComponentFeatures(features: Feature[]) {
  return (componentType: Type<unknown>) => {
    for (const feature of features) {
      feature((componentType as ɵComponentType<unknown>).ɵcmp);
    }
  };
}
