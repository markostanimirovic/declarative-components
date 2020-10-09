import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterRoutingModule } from './counter-routing.module';
import { CounterComponent } from './counter.component';
import { StoreModule } from '@ngrx/store';
import { featureName, reducer } from './counter.handlers';

@NgModule({
  declarations: [CounterComponent],
  imports: [CommonModule, CounterRoutingModule, StoreModule.forFeature(featureName, reducer)],
})
export class CounterModule {}
