import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const inititalState = {
  movies: [],
  loading: false,
  showModal: false,
  error: false,
  errorMessage: ''
}

const fetchMoviesSuccess = (state, action) => {
  return updateObject(state, { movies: action.movies, loading: false })
}

const fetchMoviesFailed = (state, action) => {
  return updateObject(state, { loading: false, error: true, errorMessage: action.error })
}

const fetchMoviesStart = (state) => {
  return updateObject(state, { loading: true })
}

const deleteMovie = (state, action) => {
  let moviesArr = state.movies;
  for (var i = 0; i < moviesArr.length; i++)
    if (moviesArr[i].imdbID === action.movieId) {
      moviesArr.splice(i, 1);
      break;
    }
  const update = [...moviesArr]
  return updateObject(state, { movies: update, loading: false, showModal: false })
}

const generateId = () => {
  let newMovieId = "tt" + (Math.floor(Math.random() * 900000) + 100000);
  return newMovieId;
}

const postMovie = (state, action) => {
  const newMovieId = generateId();
  const movieToPost = action.movie;
  const moviesArr = state.movies;
  movieToPost.imdbID = newMovieId
  moviesArr.unshift(movieToPost)
  return updateObject(state, { movies: moviesArr, showModal: false })

}

const editMovie = (state, action) => {
  const movieToEdit = action.movie;
  const id = movieToEdit.imdbID;
  const moviesArr = state.movies;
  for (var i = 0; i < moviesArr.length; i++)
    if (moviesArr[i].imdbID === id) {
      moviesArr[i] = movieToEdit;
      break;
    }
  return updateObject(state, { movies: moviesArr, showModal: false })

}

const reducer = (state = inititalState, action) => {
  switch (action.type) {
    case (actionTypes.FETCH_MOVIES_SUCCESS): return fetchMoviesSuccess(state, action);
    case (actionTypes.FETCH_MOVIES_START): return fetchMoviesStart(state, action);
    case (actionTypes.DELETE_MOVIE): return deleteMovie(state, action);
    case (actionTypes.ADD_MOVIE): return postMovie(state, action);
    case (actionTypes.EDIT_MOVIE): return editMovie(state, action);
    case (actionTypes.FETCH_MOVIES_FAILED): return fetchMoviesFailed(state, action);
    default: return state;

  }
}

export default reducer;