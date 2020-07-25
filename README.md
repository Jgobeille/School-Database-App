# ![Image description](Readme-Images\diamond.png) Steven Universe School App

## Getting Started

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

This project is a REST API for a fullstack school course application. It uses one of the most popular databases(SQLite) to store data. Additionally, this app uses Node.JS and Sequelize to perform CRUD(Create, Read, Update, and Delete) operations that allow a user to update the database with new or existing information as well as delete information.
The API will provide a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, as well as adding, updating and deleting courses in the database. In addition, the project will require users to create an account and log-in to make changes to the database.

For a live demo of this project, go to this link: COMING SOON

## Motivation

---

My motivation for this project is create a backend for a fullstack school course application. This backend will allow a user to create an account to create, edit, and delete their own courses. This project also shows my working knowledge of creating routes with Node, using vanillaJS to make custom validations, using SEQUELIZE to interact with a database and make data modeling, validation, and persistence.

This project taught me how to:

- Create a SQLite database
- Interact with the database indirectly using an ORM like Sequelize
- Creating routes with Node.js
- Perform CRUD operations by passing data through Node.js routes
- Creating input validations using express-validations npm package
- Seed a database with starter data
- Create user authorization checks using basic-auth npm package
- Use Postman application to check if routes are performing CRUD operations correctly
- Create one to many and many to one associations between two models in a database
- Hashing passwords so data is not stored as plain text

## Technology Used

---

This project uses the following technologies:

- SQLite(https://www.sqlite.org/index.html)
- Sequelize ORM(https://sequelize.org/)
- Node.js(https://nodejs.org/en/)
- JavaScript
- CSS

NPM Packages

- basic-auth(https://www.npmjs.com/package/basic-auth)
- bcryptjs(https://www.npmjs.com/package/bcryptjs)
- sequelize-cli(https://www.npmjs.com/package/sequelize-cli)
- express-validator(https://www.npmjs.com/package/express-validator)

## Features

---

1. Users can create, read, update, and delete courses in the database
2. Users can create an account in the database
3. Input validation so users have to input required information before submitting to database
4. User authorization that checks to make sure that only the same user who created the course can edit, update, or delete that course
5. Error validation for input and user authorization

## Code Example

---

### User Authorization

- This function is middleware that checks to make sure a user is logged into an account before trying to create or make changes to a course
- This middleware uses basic-auth to perform the user authorization check

```javaScript

 authenticateUser: async (req, res, next) => {
    let message = null;
    // Parse the user's credentials from the Authorization header.

    const credentials = auth(req);

    if (credentials) {
      const users = await User.findAll();

      const user = users.find((u) => u.emailAddress === credentials.name);

      // If a user was successfully retrieved from the data store...

      if (user) {
        // Use the bcryptjs npm package to compare the user's password
        // (from the Authorization header) to the user's password
        // that was retrieved from the data store.

        const authenticated = bcryptjs.compareSync(
          credentials.pass,
          user.password,
        );

        // If the passwords match...
        if (authenticated) {
          req.currentUser = user;
        } else {
          message = `Authentication failure for username: ${user.firstName}`;
        }
      } else {
        message = `User not found for username: ${credentials.firstName}`;
      }
    } else {
      message = 'Auth header not found';
    }

    // If user authentication failed...
    if (message) {
      // eslint-disable-next-line no-console
      console.warn(message);
      // Return a response with a 401 Unauthorized HTTP status code.
      res.status(401).json({
        message: 'Access Denied',
      });
    } else {
      // Or if user authentication succeeded...
      // Call the next() method.
      next();
    }
  },
```

### User and Course Input Validations

- The userValidation and courseValidation arrays act as middleware to check if the user has submitted all relevant information before submitting to a database
- Custom validations that check if the email entered is formatted correctly and is not already in use by another user
- These middleware use Express-validator to check information
- validationResultFunc checks if there are any input errors. If there are any errors, it collects them all up and sends them as JSON

```javaScript

// validations for user
module.exports = {
  userValidation: [
    check('firstName')
      .exists({
        checkNull: true,
        checkFalsy: true,
      })
      .withMessage('Please provide a value for "first name"'),
    check('lastName')
      .exists({
        checkNull: true,
        checkFalsy: true,
      })
      .withMessage('Please provide a value for "last name"'),
    check('emailAddress')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "Email"')
      .isEmail()
      .withMessage('Please provide a valid email address for "Email"')
      .custom(async (value) => {
        // Get all users
        const users = await User.findAll();

        // Check if entered email matches other emails in db
        const sameEmail = await users.find(
          (user) => user.emailAddress === value,
        );

        // if match, throw error
        if (sameEmail) {
          throw new Error(
            'The email you entered is already in use. Please use a different email',
          );
        }

        // Indicates the success of this synchronous custom validator
        return true;
      }),
    check('password')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "Password"')
      .isLength({ min: 8, max: 20 })
      .withMessage('Please provide password with 8 to 20 characters'),
  ],
  courseValidation: [
    check('title')
      .exists({
        checkNull: true,
        checkFalsy: true,
      })
      .withMessage('Please provide a value for "title"'),
    check('description')
      .exists({
        checkNull: true,
        checkFalsy: true,
      })
      .withMessage('Please provide a value for "description"'),
  ],
  // eslint-disable-next-line consistent-return
  validationResultFunc: (req, res) => {
    // Attempt to get the validation result from the Request object.
    const errors = validationResult(req);

    // If there are validation errors...
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      // Return the validation errors to the client.
      res.status(400).json({
        errors: errorMessages,
      });
      return true;
    }

    return false;
  },
};
```

### Get specific Course Route

- This route retrieves a course a user searches for
- The Sequelize query returns a match to the id submitted and displays all relevant data about the course
- The query also displays all relevant information about the user associated with the course

```javaScript
// Send a GET request to /courses/:id - Returns a the course
// (including the user that owns the course) for the provided course ID
router.get(
  '/courses/:id',
  asyncHandler(async (req, res) => {
    // get the id
    const { id } = req.params;
    const course = await Course.findOne({
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt'],
          },
        },
      ],
    });
    // send the data to the browser as JSON
    if (course) {
      res.json({ course });
    } else {
      res.status(400).json({ message: 'Course not found' });
    }
  }),
);

```

### Update Course Route

- This route updates information about a course
- This route first checks if there are no errors in course input. Next, checks if the course exists or not. Then checks if the user making the change is the same user who is associated with the course

```javaScript
// Send a PUT request to /courses/:id UPDATE(edit) a course
router.put(
  '/courses/:id',
  authenticateUser,
  courseValidation,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Attempt to get the validation result from the Request object.
    const errorCheck = validationResultFunc(req, res);

    // get course
    const course = await Course.findByPk(id);
    if (!errorCheck) {
      if (course) {
        const currentUser = req.currentUser.id;
        if (course.userId === currentUser) {
          course.title = req.body.title;
          course.description = req.body.description;
          await course.update(req.body);
          // everything A O.K. status
          // end method tells express server that route is completed
          res.status(204).end();
        } else {
          res.status(403).json({
            message: 'This user is not authorized to edit this course',
          });
        }
      } else {
        res.status(404).json({ message: 'Course Not Found' });
      }
    }
  }),
);
```

## License

---

MIT © Jamie Gobeille 2020
