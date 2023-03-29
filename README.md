# Welcome to jBlog!

jBlog is the basic content management system (CMS) powering my portfolio that
I've been constantly developing since early 2004. I've decided to open-source it
now that I have ported it to Angular in the hopes that someone else can learn
from it.

## History

jBlog started off as a pure PHP site that I intended to integrate with the
PHP-powered web forum software I was using at the time. However, I never fully
got around to getting the integration working and after a few years I closed
down the forum software as it had been replaced with a variety of social
networks that did a better job.

I've ported the front-end to Angular in an effort to learn the framework as well
as share knowledge (hence the public GitHub repo!). However, the backend remains
written in PHP, as that is all my web hosting provider allows me to use on my
hosting package - it's a LAMP package that I bought a long time ago and now rely
on for more than just site hosting so I don't plan on switching provider!

# Getting started

The site is an Nx-powered monorepo comprising of an Angular front-end and a PHP
back-end. Therefore, in order to build and run the site, you'll need to have a
development environment with the latest LTS versions of Node.js and PHP
(currently Node.JS 18 and PHP 8.2).

The PHP-side of the monorepo is currently unhooked from Nx as I try and work out
how to make them play nice together. As such, the PHP instructions are run
outside of the Nx environment.

## TL;DR:

1. Install node and npm (or yarn) and composer
1. Pull down the code (git clone ...)

**Front-end:**

1. Install JavaScript packages (dependencies) using npm (or yarn): `npm install`
1. Run a development server using `npm run serve`

**Back-end**

1. Install PHP packages: `php ./composer.phar install`
1. Have a PHP server serve the backend (`/libs/api/src`) at localhost:8080/api

# Setting up the development environment

Requirements for front-end work:

- Node.js (latest LTS)
- A web browser you're familiar with for debugging in

Requirements for back-end work:

- PHP (latest LTS)
- Composer
- A way to get PHP to serve the contents of the `/libs/api/src` directory.
- Some way to edit SQLite databases.

If you're unsure what editor to use for coding, I recommend
[Visual Studio Code](https://code.visualstudio.com/). It will load the
recommended configuration and suggest some plugins to make development easier
when the root directory is selected.

# Developing and running the Front-end

The front-end is written using the Angular framework in TypeScript, and must be
transpiled in order to run in a web browser. To do this, you'll need to pull
down the Angular dependencies using npm (or yarn). Navigate to the root
directory of this repository in a terminal and run `npm install`
(or `yarn install`) to do this.

Once this is complete, a live-reload development server can be run with
`npm run serve`. This server can be accessed by visiting http://localhost:4200 in
a web browser. Every time there is a code change, the web browser will
automatically reload with the latest changes. The server will serve a
_development_ build of the site.

Running `npm run build` will generate a `dist` folder that can be upload onto a
web server containing. This is a _production_ build and therefore with
minification and tree shaking applied.

Different configurations of the site builds request the backend from different
locations. These are provided by the files in `apps/jblog/src/environments/`
which will be swapped in to the build using the values defined in
`apps/jblog/project.json`.

## Unit testing

Running `npm run test` will run unit tests using the Jest testing framework.
Jest emulates a browser using JSDom so these tests should be able to run on
environments without a browser installed (i.e. CI pipelines).

## End-to-end testing

Running `npm run e2e` will run the tests using Cypress in a CI format. Running
`npm run e2e:watch` will run the Cypress tests interactively and watch for any
code changes.

# Developing and running the back-end

To get the back-end to work, the configuration file and SQLite databases need to
be generated.

## Enabling authentication

While having a user account set up for the site is optional (you can add posts
by modifying the database directly), the authentication libraries _need_ to be
fetched using composer before the back-end can be run.

`php ./composer.phar install`

The rest of this section is optional if user setup is unwanted.

Generate a private and public key pair for JWT signing by running the following:

```sh
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
# Don't add passphrase
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```

Move the `jwtRS256.key` and `jwtRS256.key.pub` to a secure location on the
server and update the paths in the settings file.

## Configuration file

The PHP scripts are configured by the file `/libs/api/src/conf/settings.php`.
A template file, settings-template.php, can be used as a starting point for this.
The variables are documented within that file.

## Creating the SQLite database

The SQLite database is generated with the SQL file in the
`/libs/api/src/conf/setup.sql` file. Note that if you have specified a different
database prefix in the settings file, you will need to adjust the table names in
the SQL as appropriate.

There are a few 'gotchas' when adding data to the tables manually. Many of the
data storage decisions date back to the initial versions of the software and I
haven't changed the way this part of the system works since the initial versions.

Some general things to note:

- `*_date` fields are Unix timestamps, which means they're stored as the number
  of seconds since 1st Jan 1970, 00:00 UTC.
- `*_id` fields must be unique and are the way the system refers to a record.

## Unit testing

This needs to be set up…

# Design philosophy for contributing

_Last updated January 2019_

## Core

- All colours are defined as CSS variables in
  `apps/jblog/src/theme/colors/palette-*.css`. Refer to this file to use colours.
- All dimensions ~~are defined~~ need to be refactored out into CSS variables
  and placed in the `apps/jblog/src/styles.scss :root` rule.

## Basics

- The colour palette marked `primary-a` should be used for large background areas.
- The colour palette marked `primary-b` should be used for small points of interest or calls to action.
- Small cards should mainly be imagery. Avoid small all-text cards.
- Larger cards which contain mostly text (articles, for example) should not let the text go full-width.
- Interactive items with shadows should raise `0.5px` and use the relevant hover shadow.

## Measurements, margins, etc

- Always use `px` units for elements and components, unless something needs to be separated by a space character’s width. In that case, use `em` units (0.5em is approximately a space character’s width).
- When a margin or padding needs to be defined, it should be in a multiple of `4px`.
- Only use the `.grid` CSS class to add a 12 column CSS grid to any full-width element placed inside a `.container`.

## Transitions and animations

- Default transition timing is `.2s` (and this needs to be refactored into a CSS variable);
- Default transition easing needs to be finalised.
- The _only_ time an element can move outside the bounds of the viewport is when the user changes route.

## Slow-loading content

- Use the pulse loading effect on ghost elements that appear the same size as the content that will load in **(TO DO)**.
- If the size of the content is unknown and the transition of the pulse loading effect to the content will be jarring, place a centre-aligned loading spinner in the area the content will appear.
