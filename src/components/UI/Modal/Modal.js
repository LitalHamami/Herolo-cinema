import React, { Component } from "react";
import classes from "./Modal.css";
import Auxilary from "../../../hoc/Auxilary";
import Backdrop from "../Backdrop/index";
import propTypes from "prop-types";

/**
 * Return a modal for each action: Edit/Delete/Add movie
 */
class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || !this.props.showSpinner;
  }

  render() {
    return (
      <Auxilary>
        <Backdrop show={this.props.show} clicked={this.props.clicked} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}>
          {this.props.children}
        </div>
      </Auxilary>
    );
  }
}

Modal.propTypes = {
  show: propTypes.bool
};

export default Modal;
