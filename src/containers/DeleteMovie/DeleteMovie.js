import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import propTypes from 'prop-types';
import Button from '../../components/UI/Button/index';
import classes from './DeleteMovie.css';

/**
 * Delete movie Modal with a message (cancel, ok).
 */
class DeleteMovie extends Component {

  //Delete the selected movie & close the modal!
  deleteMovie = () => {
    this.props.onDeleteMovie(this.props.movie.imdbID)
    this.props.closed();
  }

  render() {
    return <div>
      <h4>Are you sure?</h4>
      <div >
        <Button className={classes.Button} color="success" value="OK" clicked={this.deleteMovie}></Button>
        {'   '}
        <Button color="danger" value="CANCEL" clicked={this.props.closed}></Button>
      </div>
    </div>
  }
}

DeleteMovie.propTypes = {
  movie: propTypes.object,
  onCloseModal: propTypes.func,
  onDeleteMovie: propTypes.func
}

const mapDispatchToProps = dispatch => {
  return {onDeleteMovie: (movieId) => {dispatch(actions.deleteMovie(movieId))}}};

export default connect(null, mapDispatchToProps)(DeleteMovie);