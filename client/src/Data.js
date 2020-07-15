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
  api(
    path,
    method = 'GET',
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
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

    // Check if auth is required
    if (requiresAuth) {
      /**
       * The btoa() method creates a base-64 encoded ASCII string from a "string" of data.
       * We'll use btoa() to encode the email and password credentials passed to the api() method.
       * The credentials will be passed as an object containing email and password properties.
       *
       * The Authorization request header should hold the credentials to authenticate the client with the server.
       */
      const encodedCredentials = btoa(
        `${credentials.email}:${credentials.password}`
      );

      /**
       * Sets an Authorization header on each request that requires authentication by adding an Authorization
       * property to the headers object.
       *
       * Example of the authorization header sent:
       * Authorization: Basic am9lQHNtaXRoLmNvbTpqb2U=
       */

      options.headers.Authorization = ` Basic ${encodedCredentials}`;
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

  async getCourse(url) {
    const response = await this.api(url, 'GET', null);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    if (response.status === 401) {
      return null;
    }

    throw new Error();
  }

  async getUser(email, password) {
    const response = await this.api(`/users`, 'GET', null, true, {
      email,
      password,
    });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    if (response.status === 401) {
      return null;
    }

    throw new Error();
  }

  async createUser(user) {
    console.log(user);
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
