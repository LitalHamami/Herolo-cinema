import React from 'react';
import burgerLogo from '../../assets/images/logo.png';
import classes from './Logo.css';
import propTypes from 'prop-types';

const logo = (props) =>
  <div className={classes.Logo} style={{height: props.height, marginBottom: props.bottom }}> 
    <img src={burgerLogo} alt="HEROLO_CINEMA"></img>
  </div>

logo.propTypes={
  height:propTypes.string,
  bottom: propTypes.string,
};

export default logo;