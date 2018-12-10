import * as actionTypes from "./actionTypes";

const rp = require("request-promise-native");
const API_KEY = "62f46dd4";
let arr_of_promises = [];
const baseUrl = 'https://omdbapi.com';
/**
 * Fetch all movies
 */
export const fetchMovies = () => {
  return async dispatch => {
    //Update state- lodading- show Spinner
    dispatch(fetchMoviesStart());
    let movies = null;
    try {
      //Get request
      movies = await getAllMovies();
      if (!movies) throw Error("error during get movies");
      if (movies === null) {
        //Stop loading and present an error coponent
        dispatch(fetchMoviesFailed());
      }
      // iterate all movies
      movies.Search.forEach(async m => {
        if (!m) throw Error("no movie");
        arr_of_promises.push(getMovie(m.imdbID));
      });
      // // send all promises using promise.all
      let moviesArr = await Promise.all(arr_of_promises);
      //Stop loading and present all the movies!
      dispatch(fetchMoviesSuccess(moviesArr));
    } catch (error) {
      dispatch(fetchMoviesFailed(error.error.Error));
    }
  };
};

//Get request- get all movies from 'omdbapi'
let getAllMovies = async () => {
  try {
    let options = {
      method: "GET",
      uri: `${baseUrl}?s=inception&apikey=62f46dd4`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      json: true
    };
    let movies = rp(options);
    return movies;
  } catch (error) {
    console.error("getAllMovies", error);
    return;
  }
};

//Get one movie by movieID
let getMovie = imdbID => {
  let options = {
    method: "GET",
    uri: `${baseUrl}/?i=${imdbID}&apikey=${API_KEY}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    json: true
  };

  let movie = rp(options);
  if (movie.err) {
    throw Error("error");
  }
  if (!movie) return "no movie";
  return movie;
};

//Set loading 
export const fetchMoviesStart = res => {
  return {
    type: actionTypes.FETCH_MOVIES_START
  };
};

//Set movies array 
export const fetchMoviesSuccess = moviesArr => {
  return {
    type: actionTypes.FETCH_MOVIES_SUCCESS,
    movies: moviesArr
  };
};

//Set error
export const fetchMoviesFailed = error => {
  return {
    type: actionTypes.FETCH_MOVIES_FAILED,
    error: error
  };
};

export const getMovieById = movieId => {
  return {
    type: actionTypes.GET_MOVIE_BY_ID,
    movieId: movieId
  };
};

//Delete movie by id- Set the state to new array
export const deleteMovie = movieId => {
  return {
    type: actionTypes.DELETE_MOVIE,
    movieId: movieId
  };
};

//Add movie - Set the state to new array
export const addMovie = movie => {
  return {
    type: actionTypes.ADD_MOVIE,
    movie: movie
  };
};

//Edit movie by id- Set the state to new array
export const editMovie = movie => {
  return {
    type: actionTypes.EDIT_MOVIE,
    movie: movie
  };
};
