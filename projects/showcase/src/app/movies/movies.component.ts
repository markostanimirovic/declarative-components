import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoviesActions } from './movies.handlers';
import { ComponentFeatures, withActions, withSelectors } from 'component-features';
import { selectMovies, selectSelectedMovie } from './movies.selectors';

@Component({
  selector: 'sc-movies',
  templateUrl: './movies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@ComponentFeatures([
  withSelectors({
    movies: selectMovies,
    selectedMovie: selectSelectedMovie,
  }),
  withActions(MoviesActions),
])
export class MoviesComponent {
  movies!: string[];
  selectedMovie!: string;
  actions!: typeof MoviesActions;
}
