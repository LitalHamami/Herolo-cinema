import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/index";
import Movie from "../../components/Movie/index";
import Auxilary from "../../hoc/Auxilary";
import Modal from "../../components/UI/Modal/index";
import ErrorModal from "../../components/ErrorModal/index";
import DeleteMovie from "../../containers/DeleteMovie/index";
import EditMovie from "../../components/ModalTypes/EditMovie/index";
import AddMovie from "../../components/ModalTypes/AddMovie/index";
import { FaPlus } from "react-icons/fa";


/**
 * Render all movies from 'omdbapi'.
 */
class Movies extends Component {
  state = {
    modalType: null,
    currentMovie: null,
    currentMovieId: null,
    showModal: false
  };

  componentDidMount() {
    this.props.onFetchMovies();
  }

  // Show modal & Set the curren movie- The movie that has been press.
  showModalHandler(movie, modalType) {
    let movieId;
    if (movie === null) movieId = -1;
    else movieId = movie.imdbID;
    this.setState({
      currentMovieId: movieId,
      currentMovie: movie,
      modalType: modalType,
      showModal: true
    });
  }

  // Close modal.
  closeModalHandler(that) {
    that.setState({ showModal: false });
  }

  render() {
    let movies = null;
    let modal = null;
    // Waiting for response- While fetch all movies.
    if (this.props.loading) {movies = <Spinner />};
    // If err return modal with error.
    if (this.props.error) {
      return (
        <Auxilary>
          <Modal show={true}>
            <ErrorModal errorMessage={this.props.errorMessage} />
          </Modal>
        </Auxilary>
      );
    }
    if(this.props.movies.length>0) movies = this.mapMovies(this.props.movies);
    if (this.state.showModal) modal = this.showModalByType();
    return (
      <Auxilary>
        {movies}
        {modal}
      </Auxilary>
    );
  }

  /**
   *
   *   Return movie component for each movie on state.
   */
  mapMovies(movies) {
    return movies.map(movie => {
      return (
        <div key={movie.imdbID}>
          <FaPlus
            color="purple"
            size="30"
            style={{
              position: "absolute",
              top: "80px",
              right: "20",
              borderRadius: "25px",
              border: "3px solid purple"
            }}
            onClick={() => this.showModalHandler(null, AddMovie)}
          />
          <Movie
            movie={movie}
            edit={() => this.showModalHandler(movie, EditMovie)}
            delete={() => this.showModalHandler(movie, DeleteMovie)}
          />
        </div>
      );
    });
  }

  // Return Edit/Add/Delete modal.
  showModalByType() {
    return (
      <Modal clicked={this.closeModalHandler} show={this.state.showModal}>
        <this.state.modalType
          closed={() => this.closeModalHandler(this)}
          movie={this.state.currentMovie}
        />
      </Modal>
    );
  }
} //end class

const mapStateToProps = state => {
  return {
    movies: state.movies,
    loading: state.loading,
    error: state.error,
    errorMessage: state.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchMovies: () => dispatch(actions.fetchMovies())
  };
};

Movies.propTypes = {
  loading: propTypes.bool,
  movies: propTypes.array
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);
