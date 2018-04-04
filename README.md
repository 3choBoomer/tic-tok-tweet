# TicTokTweet
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

![alt text](https://travis-ci.org/3choBoomer/tic-tok-tweet.svg?branch=master "Travis Build Status")

The most recent commits to the master branch of this project will be automatically deployed to [Heroku](https://tic-tok-tweet.herokuapp.com) after a clean build on [Travis](https://travis-ci.org). (See travis build Status above).


## Configure the app
1. copy `.\config\app.config.js` to `.\config\app.config.local.js`.
2. add twitterApiKey and twitterApiSecret (you can delete any config settings you do NOT want to override in the `app.config.local.js` file.)

## Run the app

By default, the application runs is served on port 8000. You can override this by changing the PORT value in the config file mentioned above.

1. `npm install`
2. `npm start`

## Build

npm install will automatically run the build process, but you can also manually do it:

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io) and Jasmine.

