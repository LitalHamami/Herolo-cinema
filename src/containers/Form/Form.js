import React, { Component } from "react";
import Button from "../../components/UI/Button/index";
import { connect } from "react-redux";
import FormErrors from "../../shared/FormErrors/index";
import * as actions from "../../store/actions/index";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import propTypes from "prop-types";


/**
 * Return a form for both cases: Edit/Add movie 
 */
class Form extends Component {
  state = {
    values: ["Title", "Year","Runtime", "Genre", "Director"],
    imdbID: this.props.movie ? this.props.movie.imdbID : "",
    Title: this.props.movie ? this.props.movie.Title : "",
    Year: this.props.movie ? this.props.movie.Year : "",
    Runtime: this.props.movie ? this.props.movie.Runtime : "",
    Genre: this.props.movie ? this.props.movie.Genre : "",
    Director: this.props.movie ? this.props.movie.Director : "",
    formErrors: { Title: "", Year: "", Runtime: "", Genre: "", Director: "" },
    titleValid: this.props.movie ? true : false,
    yearValid: this.props.movie ? true : false,
    runtimeValid: this.props.movie ? true : false,
    genreValid: this.props.movie ? true : false,
    directorValid: this.props.movie ? true : false,
    formValid: this.props.movie ? true : false,
    isFirstInvalid: false,
    titleValidExist: this.props.movie ? true : false,
    titleValidLength: this.props.movie ? true : false
  };

  //Check if all the field are valid- update the state
  validateForm() {
    this.setState({ formValid: this.state.titleValidExist && this.state.titleValidLength && this.state.yearValid && this.state.runtimeValid && this.state.genreValid && this.state.directorValid });
  }

  //Validate every field with is own rule.
  validateField(field, value) {
    let fieldValidationErrors = this.state.formErrors;
    let yearValid = this.state.yearValid;
    let runtimeValid = this.state.runtimeValid;
    let genreValid = this.state.genreValid;
    let directorValid = this.state.directorValid;
    let titleValidExist = this.state.titleValidExist;
    let titleValidLength = this.state.titleValidExist;
    switch (field) {
      case "Title":
        titleValidExist = this.isExistingMovie(value);
        titleValidLength = value.length > 0;
        if (!titleValidExist) {
          fieldValidationErrors.Title =
            "invalid! Same movie name is already exist ";
        } else if (!titleValidLength) {
          fieldValidationErrors.Title = " is too short";
        }

        break;
      case "Year":
        const date = new Date();
        const thisYear = date.getFullYear();
        yearValid = value > 1900 && value <= thisYear;
        fieldValidationErrors.Year = yearValid ? "" : "is invalid";
        break;
      case "Runtime":
        runtimeValid = value.length > 0;
        fieldValidationErrors.Runtime = runtimeValid ? "" : " is too short";
        break;
      case "Genre":
        genreValid = value.length > 0;
        fieldValidationErrors.Genre = genreValid ? "" : " is too short";
        break;
      case "Director":
        directorValid = value.length > 0;
        fieldValidationErrors.Director = directorValid ? "" : " is too short";
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        titleValidLength: titleValidLength,
        titleValidExist: titleValidExist,
        yearValid: yearValid,
        runtimeValid: runtimeValid,
        genreValid: genreValid,
        directorValid: directorValid
      },
      this.validateForm
    );
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  //Create dynamically fields.
  createUI() {
    return this.state.values.map((field, i) => (
      <div className={`form-group ${this.errorClass(this.state.formErrors[field])}`} key={i}>
        <label>{field}</label>
        <input
        className='form-control'
          type="text"
          name={field}
          value={this.state[field]}
          onChange={this.handleChange.bind(this, i)}/>
      </div>
    ));
  }

  //On change value- set the new value to state.
  handleChange(i, event) {
    const field = event.target.name;
    const value = event.target.value;
    this.setState({ [field]: value }, () => {
      this.validateField(field, value);
    });
  }

  //Validate that the user didn't inser an existing movie title
  isExistingMovie(Title) {
    const moviesArr = this.props.movies;
    for (let i = 0; i < moviesArr.length; i++) {
      if (moviesArr[i].Title === Title) {
        return false;
      }
    }
    return true;
  }

  //Create a movie and check if to Edit exist movie ar Add a new one.
  postMovie = (e) => {
    e.preventDefault();
    const movie = {
      imdbID: this.state.imdbID,
      Title: this.state.Title,
      Year: this.state.Year,
      Runtime: this.state.Runtime,
      Genre: this.state.Genre,
      Director: this.state.Director,
    };
    if (this.props.movie) {
      this.props.onEditMovie(movie)
    }
    else {
      this.props.onAddMovie(movie)
    }
    this.props.closed();
  }

  render() {
    let header = null;
    if (this.props.movie) header = <h4>Edit "{this.props.movie.Title}" Movie</h4>
    else header = <h4>Add new movie</h4>;
    return (
      <form onSubmit={this.handleSubmit}>
        {header}
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        {this.createUI()}
        <div>
          <Button 
          value="SAVE" 
          color="success" 
          disabled={!this.state.formValid} 
          clicked={this.postMovie}/>
          {"   "}
          <Button value="CANCEL" color="danger" clicked={this.props.closed} />
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {movies: state.movies};
};

const mapDispatchToProps = dispatch => {
  return {
    onAddMovie: movie => {dispatch(actions.addMovie(movie));},
    onEditMovie: movie => {dispatch(actions.editMovie(movie));}};
};

Form.propTypes = {
  movie: propTypes.object,
  onEditMovie: propTypes.func,
  onAddMovie: propTypes.func,
  closed: propTypes.func
}

export default connect(mapStateToProps,mapDispatchToProps)(Form);
