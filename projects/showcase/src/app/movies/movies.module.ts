import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { StoreModule } from '@ngrx/store';
import { featureName, reducer } from './movies.handlers';

@NgModule({
  declarations: [MoviesComponent],
  imports: [CommonModule, MoviesRoutingModule, StoreModule.forFeature(featureName, reducer)],
})
export class MoviesModule {}
