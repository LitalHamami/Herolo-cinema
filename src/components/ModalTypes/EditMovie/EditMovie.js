import React from "react";
import propTypes from "prop-types";
import Form from '../../../containers/Form/index'

/**
 *
 * Return modal with form for editing the selected movie.
 */
const editMovie = props => <div><Form closed={props.closed} movie={props.movie} /></div>

editMovie.propTypes = {
  movie: propTypes.object,
  closed: propTypes.func
};

export default editMovie;
