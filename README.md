# <img src="Readme-Images/diamond.png" width="50px" height="50px"> Steven Universe School App <img src="Readme-Images/diamond.png" width="50px" height="50px">

## Getting Started

<img src="Readme-Images/SU-Title-card.png" width="100%">

## How to Start API

To get up and running with this project, run the following commands from the root of the folder that contains this README file.

First, install the project's dependencies using `npm`.

```bash
npm install

```

Lastly, start the application.

```bash
npm start
```

To test the Express server, browse to the URL [http://localhost:5000/](http://localhost:5000/).

---

## Client Side

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# Explanation

This project is a Frontend React client built for a previous REST API I made. This fullstack application is a School Database where users can create an account and log in to. After making an account they are able to create, view, update, and delete courses that they have created in the database. The client side of this app is built in React, a powerful open-source library used to build interactive user interfaces. The client side also utilizes React Router, a library used to create routing for applications since React itself does not come with its own routing capabilities. React is very useful for this application because you can make reusable components to make development time faster and less redundant. React also uses "state management", a feature which allows for different components to be able to store and pass around the application more easily. Lastly, this application uses a basic form of authentication to allow users to log in and create/edit/delete courses that are tied to their account.

This project also uses a REST API to create, read, update, and delete course and user data stored in a database. It uses one of the most popular databases(SQLite) to store data. Additionally, this app uses Node.JS and Sequelize to perform CRUD(Create, Read, Update, and Delete) operations that allow a user to update the database with new or existing information as well as delete information.
The API will provide a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, as well as adding, updating and deleting courses in the database. In addition, the project will require users to create an account and log-in to make changes to the database.

The theme of the application is based off of one of my favorite TV shows <a href="https://en.wikipedia.org/wiki/Steven_Universe">Steven Universe</a> and <a href="https://en.wikipedia.org/wiki/Steven_Universe_Future">Steven Universe Future</a>. In the latter series, the characters create a school to help Gems adjust to life on earth. I absolutely adore this series and it was fun to use the color schemes and create courses that the characters might make for the school!

For a live demo of this project, go to this link: COMING SOON

## Motivation

---

My motivation for this project is to test to my newly learned skills to their limits by creating a full fledged fullstack application that uses a modern tech stack(React, NodeJS, SQL, HTML, JS, CSS). This is also the client side application for a REST API I built previously. Lastly, I wanted to nerd out and make an application in honor of one of the greatest cartoons ever made.

This project taught me how to:

- Use JavaScript and JSX to build out the components for your application in a modular fashion.
- Allow users to sign up and use basic authentication to support users signing in.
- Make requests to REST API via client side with Fetch API.
- Use Context API in React to allow data to sit at the top of the application and be passed down to components that need specific data as opposed to using prop drilling which can be both tedious and often requires you to send data through components that don't need that data.
- Implement private routes that keep unauthorized users from editing deleting data that they are not supposed to.
- Make an application responsive to different screen sizes using Flex box.
- Connect a client side application to a REST API
- Use Cookies to persist user data

## Technology Used

---

This project uses the following technologies:

- SQLite(https://www.sqlite.org/index.html)
- Sequelize ORM(https://sequelize.org/)
- Node.js(https://nodejs.org/en/)
- React(https://reactjs.org/)
- React Router(https://reactrouter.com/)
- JavaScript
- CSS

NPM Packages

- basic-auth(https://www.npmjs.com/package/basic-auth)
- bcryptjs(https://www.npmjs.com/package/bcryptjs)
- sequelize-cli(https://www.npmjs.com/package/sequelize-cli)
- express-validator(https://www.npmjs.com/package/express-validator)
- react-router(https://reactrouter.com/)
- js-cookie(https://github.com/js-cookie/js-cookie)
- react-markdown(https://rexxars.github.io/react-markdown/)

## Features

---

1. Users can create, read, update, and delete courses
2. Users can create an account
3. User data persistance using cookies
4. Private routes that secures other user data from unauthorized users
5. Error validation for all forms

## Code Examples

---

### Reusable API call function

- Takes information from client side and uses that to make a request to REST API. Has several parameters to check what type of request is being made, if request requires authentication, if any other information needs to be passed to REST API.

```javaScript
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
```

### Context

- A function that wraps any "subscribed components to context so data can be passed more freely to them.

```javaScript

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
```

### Reusable Form Component

- The file components/Form.js exports a function that renders any validation errors sent from the API,
  via the <ErrorsDisplay> function component.
- It also renders the "Submit" and "Cancel" buttons of a form,as well as handle their functionality, via the functions handleSubmit and handleCancel.
- Props are passed to this component – from a parent component like UserSignUp – to provide it the data it needs.

```javaScript
const Form = ({ cancel, errors, submit, submitButtonText, elements }) => {
  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className=" pad-bottom submit-cancel-buttons">
          <button className="submit-button button" type="submit">
            {submitButtonText}
          </button>
          <button
            className="button button-secondary"
            type="submit"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}

```

## Images

### Full Screen

## ![Image description](Readme-Images/fullscreen-1.png)

## ![Image description](Readme-Images/fullscreen-2.png)

## ![Image description](Readme-Images/fullscreen-3.png)

## ![Image description](Readme-Images/fullscreen-4.png)

## ![Image description](Readme-Images/fullscreen-5.png)

## ![Image description](Readme-Images/fullscreen-6.png)

## ![Image description](Readme-Images/fullscreen-7.png)

### Mobile

## ![Image description](Readme-Images/mobile-1.png)

## ![Image description](Readme-Images/mobile-2.png)

## ![Image description](Readme-Images/mobile-3.png)

## ![Image description](Readme-Images/mobile-4.png)

## ![Image description](Readme-Images/mobile-5.png)

## ![Image description](Readme-Images/mobile-6.png)

## License

---

## Style Changes

---

The following style changes to the original Treehouse project are as noted:

1. Colors, background changed
2. Added modal window for added UI experience
3. Switched out old grid system for flexbox
4. Added pop up window for delete button
5. Added loading animation

MIT © Jamie Gobeille 2020
