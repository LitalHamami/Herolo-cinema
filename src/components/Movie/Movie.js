import React from "react";
import classes from "./Movie.css";
import propTypes from "prop-types";
import Button from "../UI/Button/index";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

/**
 *
 * Return movie component for each movie in state
 */
const movie = props => (
  <div className={classes.movieDiv}>
    <Card className={classes.movieCard}>
      <CardBody>
        <CardTitle size="50" className={classes.Strong}>
          <strong className={classes.MovieTitle}>
            {props.movie.Title.toLowerCase().replace(/[^a-zA-Z ]/g, "")}
          </strong>
        </CardTitle>
        {createCardsText(props)}
        <Button value="EDIT" color="success" size="26" clicked={props.edit} />
        {"   "}
        <Button value="DELETE" color="danger" size="26" clicked={props.delete}/>
      </CardBody>
    </Card>
  </div>
);

//All movie fields.
const fieldArr = ["Year", "Runtime", "Genre", "Director"];

//Create card text for each field.
function createCardsText(props) {
  return fieldArr.map(field => {
    return (
      <CardText key={props.movie.imdbID + Math.random()}>
        <strong className={classes.first}>{field}: </strong>
        {  props.movie[field]}
      </CardText>
    );
  });
}

movie.propTypes = {
  img: propTypes.string,
  title: propTypes.string,
  year: propTypes.number,
  runtime: propTypes.string,
  genre: propTypes.string,
  director: propTypes.string,
  edit: propTypes.func,
  delete: propTypes.func
};

export default movie;
