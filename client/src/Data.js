import config from './config';

export default class Data {
  /**
   * API method:
   * used to make the GET and POST requests to the REST API. It currently accepts an API endpoint as its
   * first argument (path), followed by the HTTP method, and body, which will contain any data associated
   * with the request.
   *
   * @param {string} path
   * @param {string} method
   * @param {object} body
   *
   *@returns {function} fetch api to make a promise based request
   */

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

  async getCourses() {
    const response = await this.api(`/courses`, 'GET', null);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    if (response.status === 401) {
      return null;
    }

    throw new Error();
  }

  async getUser() {
    const response = await this.api(`/users`, 'GET', null);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    if (response.status === 401) {
      return null;
    }

    throw new Error();
  }

  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    if (response.status === 400) {
      return response.json().then(data => data.errors);
    }

    throw new Error();
  }
}
