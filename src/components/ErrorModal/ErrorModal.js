import React from 'react';
import propTypes from 'prop-types';

/**
 * 
 * Return an error modal if exist error.
 */
const errorModal = (props) => <div>{"Something went wrong!"+props.errorMessage}</div>

errorModal.propTypes={
  errorMessage:propTypes.string,
};

export default errorModal;