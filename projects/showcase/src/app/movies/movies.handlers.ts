import { combineHandlers } from 'ngrx-handlers';

export const featureName = 'movies';

export interface State {
  movies: string[];
  selectedMovie: string | null;
}

const initialState: State = {
  movies: ['Movie 1', 'Movie 2', 'Movie 3'],
  selectedMovie: null,
};

export const { actions: MoviesActions, reducer } = combineHandlers(initialState, featureName, {
  addMovie: (state, { movie }: { movie: string }) => ({
    ...state,
    movies: [...state.movies, movie],
  }),
  updateSelectedMovie: (state, { selectedMovie }: { selectedMovie: string }) => ({
    ...state,
    selectedMovie,
  }),
  removeSelectedMovie: state => ({
    ...state,
    movies: state.movies.filter(movie => movie !== state.selectedMovie),
    selectedMovie: null,
  }),
});
