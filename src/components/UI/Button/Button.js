import React from 'react';
import {Button} from 'reactstrap';
import propTypes from 'prop-types';

/**
 * 
 * Return a button 
 */
const button = (props) =>
   <Button onClick={props.clicked} disabled={props.disabled} color={props.color}>{props.value}</Button>


button.propTypes={
  clicked:propTypes.func,
  disabled: propTypes.bool
};


export default button;