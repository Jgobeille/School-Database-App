import React, { Component } from 'react';

import CourseDetailsActionsBar from './CourseDetailsActionsBar.js';
import config from '../config';

/**
 * Renders the description and details of a course
 */

export default class CourseDetails extends Component {
  state = {
    courseDetails: '',
  };

  componentDidMount() {
    this.getCourse();
  }

  async getCourse() {
    // eslint-disable-next-line react/prop-types
    const { match } = this.props;
    const response = await this.api(match.url, 'GET', null);
    if (response.status === 200) {
      return response.json().then(data =>
        this.setState({
          courseDetails: data.course,
        })
      );
    }
    if (response.status === 401) {
      return null;
    }

    throw new Error();
  }

  // eslint-disable-next-line class-methods-use-this
  api(path, method = 'GET', body = null) {
    // concatenates the path request with the base url
    const url = config.apiBaseUrl + path;

    // sends a request with the HTTP method, as well as the request headers and a stringified body (if body is provided).
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    return fetch(url, options);
  }

  render() {
    const { courseDetails } = this.state;
    console.log(courseDetails);
    const { user } = courseDetails;
    let materials;
    // const materialsNeeded = courseDetails.materialsNeeded.split('*');

    if (courseDetails.materialsNeeded) {
      materials = courseDetails.materialsNeeded.split('*');
    }

    // eslint-disable-next-line react/destructuring-assignment
    // eslint-disable-next-line react/prop-types;
    return (
      <React.Fragment>
        <CourseDetailsActionsBar />
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{courseDetails.title}</h3>
              <p>By: {user ? `${user.firstName} ${user.lastName}` : ''}</p>
            </div>
            <div className="course--description">
              <p>{courseDetails.description}</p>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{courseDetails.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    {materials
                      ? materials
                          .slice(1)
                          .map((material, id) => <li key={id}>{material}</li>)
                      : ''}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
