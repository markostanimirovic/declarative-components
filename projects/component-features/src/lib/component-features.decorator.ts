import { Type, ɵComponentType } from '@angular/core';
import { Feature } from './models';

export function ComponentFeatures(features: Feature[]) {
  return (componentType: Type<any>) => {
    for (const feature of features) {
      feature((componentType as ɵComponentType<any>).ɵcmp);
    }
  };
}
