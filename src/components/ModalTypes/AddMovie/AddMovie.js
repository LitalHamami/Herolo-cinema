import React from "react";
import propTypes from "prop-types";
import Form from '../../../containers/Form/index'


/**
 *
 * Return modal with form for adding new movie.
 */
const addMovie = props => <div><Form closed={props.closed}></Form></div>

addMovie.propTypes = {
  close: propTypes.func,
};

export default addMovie;
