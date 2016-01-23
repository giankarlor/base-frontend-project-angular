## Frontend Base Project

A starter application for frontend development.

## Configuration

Start by cloning the repository:

```
$ git clone https://github.com/jamigibbs/base-frontend-project.git <your-frontend-project-name>
```

The project uses Grunt to run tasks in development. To start, install the project dependencies by running:

```
$ npm install
```

## Run the Application

Run the application using the Grunt file's `default` task:

```
$ grunt
```

The default task runs a simple server on port 3000. To view it in a any browser, go to [http://localhost:3000](http://localhost:3000).

### Using without Angular

By default, the application is configured to be used in a Single-Page Application (SPA) with AngularJS. If you're working on a project that doesn't use AngularJS, see the instructions below [for configuring the server to run in a non-SPA](#configure-server-for-non-spas).

## Directory Structure

```
├── app
│   ├── assets
│   │   └── images
│   ├── pages
│   │   └── index.html
│   ├── sass
│   │   └── style.scss
│   ├── scripts
│   │   └── app.js
│   └── templates
│       └── home.html
├── Gruntfile.js
├── LICENSE
├── package.json
├── Procfile
├── README.md
└── server.js
```

All code, styles, markup, and assets should be saved to the `app` directory. Saving changes creates a new directory, `dist`, that holds final copies of the application content. `dist` is the directory the server uses to serve the content displayed by the browser. __Do not edit files in `dist`__ because it will reset changes to your work every time you save. Restrict all edits to files in the `app` directory.

### Assets/Images

Add images to the `app/assets/images` directory. To reference images in HTML, use the path `/assets/images/<image file name>.jpg`. For example, to include an image called `logo.png`, the path for the `src` attribute in the HTML would be:

```html
<img src="/assets/images/logo.png">
```

The Gruntfile is pre-configured to handle assets in a subfolder with the `png,jpg,jpeg,mp3` extensions.

>See lines 14 and 35 of `Gruntfile.js` for the accepted file extensions of assets.

### Difference between Pages and Templates

The `templates` directory should hold any HTML files used as templates in Angular states configured by UI Router. All other HTML files belong in the `pages` directory.

### Deploying to Heroku

Sign up for a [free Heroku account](http://api.heroku.com/signup), and install the [Heroku toolbelt](https://toolbelt.heroku.com/) for your operating system. The toolbelt is software that Heroku provides for running various deployment and application-related operations from the command line.

Open your command line utility and run:

```
$ heroku login
```

Enter your credentials and you'll be able to perform operations specific to your account.

If you aren't in your project's root directory, `cd` into it and run:

```
$ heroku create
```

This creates a randomly generated application name and adds heroku as one of your remote destinations so you can push your repo to Heroku easily. Optionally, you can create a named app instead of having Heroku generate one. See Heroku's documentation for [creating named apps](https://devcenter.heroku.com/articles/creating-apps#creating-a-named-app).

**Deploy Using the Base Frontend Project**

Deploying a project to Heroku is as simple as:

```
$ git push heroku master
```

Heroku automatically detects that you're running a Node application from the package.json and installs all of its dependencies when you push.

To view the information about your application, including the URL, run:

```
$ heroku apps:info
```

You can also open the application in your browser by running:

```
$ heroku open
```

**Procfile**

The `Procfile` is a file for [providing instructions to Heroku servers](https://devcenter.heroku.com/articles/procfile) that run after pushing new code to the repository. __Do not change the contents of the Procfile__ or Heroku will throw an error when you attempt to visit your application.

**Troubleshooting**

Whenever you integrate a new service like Heroku, you increase the chances of seeing new errors. For example, you may see the following error when pushing for the first time:

```
$ git push heroku master
Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

This occurs because you haven't created keys with Heroku. Follow the steps outlined in [this article](https://devcenter.heroku.com/articles/keys) to create an SSH key and add it to Heroku.

Heroku keeps extensive documentation for many common errors when using its platform. Consult the [Dev Center docs](https://devcenter.heroku.com/) when you run into issues before messaging your mentor.

## Configure Server for Non-SPAs

By default, this base project is configured to be used with SPAs. If you're not building a project with Angular, then modify `server.js` with the following:

```diff
var Hapi = require('hapi'),
    path = require('path'),
    port = process.env.PORT || 3000,
    server = new Hapi.Server(port),
    routes = {
        css: {
            method: 'GET',
            path: '/css/{path*}',
            handler: createDirectoryRoute('css')
        },
        js: {
            method: 'GET',
            path: '/scripts/{path*}',
            handler: createDirectoryRoute('scripts')
        },
        assets: {
            method: 'GET',
            path: '/assets/{path*}',
            handler: createDirectoryRoute('assets')
        },
        templates: {
            method: 'GET',
            path: '/templates/{path*}',
            handler: createDirectoryRoute('templates')
        },
-        spa: {
+        staticPages: {
             method: 'GET',
             path: '/{path*}',
-            handler: {
-                file: path.join(__dirname, '/dist/index.html')
-            }
+            handler: createDirectoryRoute('/')
         }
     };

-server.route([ routes.css, routes.js, routes.images, routes.templates, routes.spa ]);
+server.route([ routes.css, routes.js, routes.images, routes.templates, routes.staticPages ]);
...
```

Optionally, delete the `templates` directory and all references to it in `Gruntfile.js` to remove unnecessary files (templates are only useful for SPAs). However, keeping them in the repository won't affect your application.

## Grunt plugins

A list of the Grunt plugins in this application.

#### Watch

[Grunt watch](https://github.com/gruntjs/grunt-contrib-watch) watches for changes to file content and then executes Grunt tasks when a change is detected.

#### Copy

[Grunt copy](https://github.com/gruntjs/grunt-contrib-copy) copies files from our development folders and puts them in the folder that will be served with the frontend of your application.

#### Clean

[Grunt clean](https://github.com/gruntjs/grunt-contrib-clean) "cleans" or removes all files in your distribution folder (`dist`) so that logic in your stylesheets, templates, or scripts isn't accidentally overridden by previous code in the directory.

#### Sass

[Grunt Sass](https://github.com/sindresorhus/grunt-sass) This task uses libsass, which is a Sass compiler in C++. It's a lot faster than the original Ruby compiler and fully compatible.

#### Browserify
[Browserify](https://github.com/substack/node-browserify) will recursively analyze all the require() calls in your app in order to build a bundle you can serve up to the browser in a single `<script>` tag.

#### Angular
[Angular](https://www.npmjs.com/package/angular) is a structural framework for dynamic web apps.

#### Angular UI Router
[Angular UI Router](https://www.npmjs.com/package/angular-ui-router) a routing framework for AngularJS, which allows you to organize the parts of your interface into a state machine.

#### Hapi

[Grunt Hapi](https://github.com/athieriot/grunt-hapi) runs a server using [`HapiJS`](http://hapijs.com/). Happi is a Node web application framework with robust configuration options.

## Credit

This project is based on the work by [Joe Lipper](https://github.com/joelip).
