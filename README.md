# AngularJS / RequireJS / Gulp / Express / MongoDB Seed

## Demo

Demo available: http://projects.igorprado.com/project-seed/

For studies purpose, I started to build an simple app that I could use:
* [NodeJS](http://nodejs.org/)
* [Express](http://expressjs.com/)
* [AngularJS](https://angularjs.org/)
* [MongoDB](https://www.mongodb.com/)
* [Gulp](http://gulpjs.com/)

Express is used to serve the static files, templates to AngularJS and provide an RESTful API to manipulate MongoDB collections.

Gulp is used to build our frontend files (CSS, JS and optimize images).

This seed is based on:
* [Angular Express Seed](https://github.com/btford/angular-express-seed)
* [AngularAMD](https://github.com/marcoslin/angularAMD)
* [AngularUI Router](https://github.com/angular-ui/ui-router)
* [Bootstrap](http://getbootstrap.com/)

## How to use this seed

### Install

Clone this repo:

    git clone git@github.com:igorprado/angular-requirejs-gulp-express-mongodb-seed.git

Run `npm install` to install the dependencies:
    
    npm install

Install Gulp globally:

    npm install gulp -g

### Running the app

Build the frontend files:

    gulp

For development, use `gulp watch` to build the frontend files automatically.

Configure your MongoDB database and credentials on `app.js`:

    mongoose.connect('mongodb://<user>:<pass>@<host>:<port>/<db>');

_NOTE: If you don't have a MongoDB on your development machine, a simple way to start with this app is create a free MongoDB instance at [Mongolab](https://mongolab.com/home)._

Runs like a typical express app:

    node app.js

_For development enviroment, I recommend install [Supervisor](https://github.com/isaacs/node-supervisor)._

### Running tests

I have to learn more about tests. So, it's on my roadmap for this seed.

## Directory Layout
    
    app.js              --> App config
    package.json        --> For npm
    bower.json          --> Frontend libs dependencies
    frontend/           --> All of the source files to be used in on the client side (will be compiled on public/)
      sass/             --> Stylesheet files
        app.sass        --> Default sass stylesheet
        includes/       --> Divide our stylesheet in parts
      img/              --> Image files
      js/               --> Javascript files
        app.js          --> Declare top-level app module
        main.js         --> Default config for RequireJS
        beers/          --> Our app is divided by modules. This is an example module
          controllers/  --> All controllers of our module
          services/     --> All services of our module
          beers.js      --> Declare our module and routes config
        directives/     --> Define our application directives
      lib/              --> Our bower dependencies are installed here
    public/             --> Our genereted files will be placed here (after run gulp)
    routes/
      api.js            --> Top-level route config
      index.js          --> Route for serving HTML pages and partials (AngularJS templates)
      api/              --> All route configs of our modules will be here
        beers.js        --> Our example module route config.
    views/
      index.jade        --> Main page for app, where the top-level ui-view is defined
      layout.jade       --> Doctype, title, head boilerplate
      partials/         --> Angular view partials (partial jade templates)
        index.jade      --> The default state (for UI Router)
        beers/          --> All the templates for our module are listed here



## Example App

A simple [beer management app](http://projects.igorprado.com/project-seed/) is running and using this seed.

## Support

Feel free to comment, fork or upgrade this code. As I said, this was built to study this technologies.

## License
MIT