import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureName, State } from './movies.handlers';

export const selectMoviesState = createFeatureSelector<State>(featureName);
export const selectMovies = createSelector(selectMoviesState, state => state.movies);
export const selectSelectedMovie = createSelector(selectMoviesState, state => state.selectedMovie);
