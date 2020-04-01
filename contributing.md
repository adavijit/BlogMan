## Contrbution Guide
### Steps to Contribute.
* Fork the project **https://github.com/adavijit/BlogMan**
* Clone the forked project in your computerusing
   **git clone https://github.com/YOUR_USERNAME/BlogMan**
* Go to the project
   **cd BlogMan**
* Open the terminal in VS Code and add the **upstream** repository too.
  **git remote add upstream https://github.com/adavijit/BlogMan**
* Create a seperate branch from the master branch in order to keep your master branch clean.
  **git branch BRANCH_NAME**
* Always take pull from the upstream repo to your master branch in order to keep it at par with the main project.
  **git pull upstream master**
  
* Before creating an issue, discuss it withe project mentors in the [Slack Channel](https://gssoc20.slack.com)
* Create a seperate branch from the **master** branch before contributing anything in order to make your **local** and **origin** master branches at par with the **upstream** master branch.
* **Free PR**: no permission is needed to work on the code. Fork `master`, submit a PR and ask for reviewing. PR is the natural place for code comparison and corrections. If many contributors have something ready in a PR, we can consider opening a branch in which different people working on the same part of the application can collaborate.

# Set up the database first in order to start your back-end server.

### How to set up your mongoDB cloud server.
* Head over to mongoDB Atlas website. You may refer to the given link to know how to make cluster.
   **https://docs.atlas.mongodb.com/getting-started/**
* In your atlas dashboard click connect then click connect your application.
* Copy the link and paste it to .env file as MONGO_URL_CLOUD in the back-end.
* Replace username and password with the one you created while giving access to the database.
* Replace MONGO_URL_LOCAL with MONGO_URL_CLOUD in the server.js file in the back-end. 
* Start the server you are ready to go.


### Steps to setup your development environment.
* Cd over to the back-end.
   **cd back-end/**
* Install the npm dependencies.
   **npm install** 
* Start the server
   **npm start**
* Head back to the main directory.
   **cd ..**
* Cd over to the front-end.
   **cd front-end/**
* Install the npm dependencies.
   **npm install**
* Start the front-end server
   **npm start**



