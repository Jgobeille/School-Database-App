/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

export default class PopUp extends Component {
  handleClick = () => {
    const { toggle } = this.props;
    toggle();
  };

  delete = e => {
    /**
     * For reasons I cannot explain, using preventDefault keeps the courseDetails page from rerendering and trying
     * to make a GET request on a course that doesn't exist anymore after being deleted.
     */
    e.preventDefault();
    const { deleteCourse } = this.props;
    deleteCourse();
  };

  render() {
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          <form>
            <h3>
              Are you sure you want to delete this course? This action cannot be
              undone!
            </h3>
            <button className="button" type="submit" onClick={this.delete}>
              Delete Course
            </button>
          </form>
        </div>
      </div>
    );
  }
}
