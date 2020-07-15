/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UpdateCourse extends Component {
  state = {
    courseDetails: '',
  };

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { context, match } = this.props;

    context.data.getCourse(`/courses/${match.params.id}/`).then(courseData =>
      this.setState({
        courseDetails: courseData.course,
      })
    );
  }

  render() {
    const { courseDetails } = this.state;

    const { user } = courseDetails;
    const { match } = this.props;

    const courseDetailsPage = `/courses/${match.params.id}`;

    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <form>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className="input-title course--title--input"
                    placeholder="Course title..."
                    value={courseDetails.title}
                  />
                </div>
                <p>By: {user ? `${user.firstName} ${user.lastName}` : ''}</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea
                    id="description"
                    name="description"
                    className=""
                    placeholder="Course description..."
                    value={courseDetails.description}
                  />
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input
                        id="estimatedTime"
                        name="estimatedTime"
                        type="text"
                        className="course--time--input"
                        placeholder="Hours"
                        value={courseDetails.estimatedTime}
                      />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        className=""
                        placeholder="List materials..."
                        value={courseDetails.materialsNeeded}
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">
                Update Course
              </button>
              <Link className="button button-secondary" to={courseDetailsPage}>
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
