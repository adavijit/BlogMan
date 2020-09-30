# BlogMan


## About

"Publish your words in your way! Whether you'd like to share your knowledge, experiences or the latest news, publish your own articles in a unique and smart way"

BlogMan is a new social blogging platform where anybody can share their views and read other's opinion related to any topic. It is a way to connect with people and to know how the world is thinking.
BlogMan is created using the MongoDB, Express, React and NodeJS (MERN Stack).

## Built With

MongoDB - Database<br />
Express - NodeJS Framework<br />
React - Frontend<br />
NodeJS - Backend<br />
CKEditor - Creating blogs<br />

## Build Setup

In the project directory `BlogMan/front-end`, run this command to install dependencies:

### `npm install`

In order to run the application:

### `npm start`

Runs the app in the development mode.<br />

Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload automatically if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />

## MongoDB Connection (Database)

Open "back-end/.env" to setup MongoDB environment and add your MongoDB URI, local or Atlas, client-id, client-secret and Youtube API key.<br />
Console will display "Mongoose connected" if there are no issues with the connection.
If there is any pertaining issue, console displays "Mongoose connection failed".<br />

## Running the entire app on docker

 - The docker files have been written for both the frontend and backend(inside the respective folders)
 - Make sure you have `docker` and `docker-compose` installed on your system.
 - Go to the root directory of the project.
 - Run `docker-compose up --build`.
 - This will build the individual docker images from within the respective folders and create the containers.
 - The `docker-compose` file acts as a manager, for the individual docker files. It decides and configures things like which container runs on which port, the names of the containers and even the starting order of the docker containers.
 - We use docker containers to run/develop our apps because they are light weight and while using docker containers, we don't need to have the respective tech-stack(like, npm, angular-cli, react-cli) locally installed on our system. This gives developers the ability to continue to develop projects irrespective of the platforms they are working on.
 - **NOTE**: The MongoDB database for this project is running and maintained on Mongo Atlas as of now. Since multiple people have contributed to this project, before starting the apps, make sure the required API Keys are in-place(because some API keys are defined inside the respective folders - for both frontend and backend, and not through docker environment variables), otherwise there may be some weird errors.
 - Should you run into some error, please refer the official documentation [here](https://docs.docker.com/)

### Prerequisites to contribute

- Basic knowledge of programming
- Ability to use Git and Github
- Working knowledge of Flutter is preferable
- UI/UX skills are appreciable but not mandatory

### Contributing

## How to contribute:

![GSSOC'20](https://img.shields.io/badge/GSSOC-20-orange?style=for-the-badge)

**1.** Fork [this](https://github.com/adavijit/BlogMan) repository.

**2.** Clone the forked repository.

```terminal
git clone https://github.com/<your-github-username>/BlogMan
```

**3.** Navigate to the project directory.

```terminal
cd girlscript_app
```

**4.** Create a new branch.

```terminal
git checkout -b <your_branch_name>
```

**5.** Make changes in source code.

**6.** Commit your changes.

```terminal
  git add .
  git commit -m "<your_commit_message>"
```

**7.** Push your local branch to the remote repository.

```terminal
git push -u origin <your_branch_name>
```

**8.** Create a Pull Request!

**Congratulations!** Sit and relax, you've made your contribution to [BlogMan](https://github.com/adavijit/BlogMan) project.

## Contribution Guidelines

- Write clear meaningful git commit messages (Do read [this](http://chris.beams.io/posts/git-commit/)).

- Make sure your PR's description contains GitHub's special keyword references that automatically close the related issue when the PR is merged. (Check [this](https://github.com/blog/1506-closing-issues-via-pull-requests) for more info)

- When you make very very minor changes to a PR of yours (like for example fixing a text in button, minor changes requested by reviewers) make sure you squash your commits afterward so that you don't have an absurd number of commits for a very small fix. (Learn how to squash at [here](https://davidwalsh.name/squash-commits-git))

- When you're submitting a PR for a UI-related issue, it would be really awesome if you add a screenshot of your change or a link to a deployment where it can be tested out along with your PR. It makes it very easy for the reviewers and you'll also get reviews quicker.

- Please follow the [PR Template](https://github.com/vinitshahdeo/Water-Monitoring-System/blob/master/.github/PULL_REQUEST_TEMPLATE.md) to create the PR.

- Always create PR to `develop` branch.

- Please read our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Guidelines while working on API

We have layed out some guidelines for error handling on the backend. Kindly read and implement it when you're working on any API.

https://github.com/adavijit/BlogMan/pull/96#issue-384383423

## Owner

[Avijit Das](https://github.com/adavijit)<br />

## Mentors

[Avijit Das](https://github.com/adavijit)<br />
[Rajat Upadhyay](https://github.com/rajatmw1999)<br />
[Pratham Dogra](https://github.com/PrathamDogra)<br />
[Ayushi](https://github.com/ayushi59)
[Sanjeev Kumar](https://github.com/drcoolsanjeev)

Keep Contributing !!
We love your input !!
