# Welcome to jBlog!
jBlog is the basic content management system (CMS) powering my portfolio that
I've been constantly developing since early 2004. I've decided to open-source it
now that I have ported it to Angular in the hopes that someone else can learn
from it.

# Building and running
jBlog is an Angular front-end with a PHP back-end. Therefore, in order to build
and run the site, you'll need to have a development environment with Node.js
(6.7+) and PHP (5.6+).

## Why a PHP back-end?
The simple answer is that my web host only allows PHP scripts–it's a LAMP
package which I purchased a long time ago when PHP sites were the norm. I now
rely upon it for day-to-day things (i.e. e-mail) that it is actually difficult
to switch provider.

## Super quick start
1. Install node and npm (or yarn)
2. Pull down the code (git clone ...)
3. Install JavaScript packages (dependencies) using npm (or yarn): `npm install`
4. Run a development server using `ng serve`
5. Have a PHP server serve the backend (`/src/api`) at localhost:8080/api

## Setting up the development environment
Requirements for front-end work:
 - Node.js (6.7+)
 - A web browser you're familiar with for debugging in

Requirements for back-end work:
 - PHP (5.6+)
 - A way to get PHP to serve the contents of the `/src/api` directory.
 - Some way to edit SQLite databases.

Also, optionally:
 - Global install of [Angular CLI](https://cli.angular.io)

If you're unsure what editor to use for coding, I recommend
[Visual Studio Code](https://code.visualstudio.com/) with the following plugins:
- CodeMetrics
- Prettier - Code formatter (enable format on save)
- stylelint
- SCSS IntelliSense

## Building the site
### Front-end
The front-end is written using the Angular framework in TypeScript, and must be
transpiled in order to run in a web browser. To do this, you'll need to pull
down the Angular dependencies using npm (or yarn). Navigate to the root
directory of this repository in a terminal and run `npm install`
(or `yarn install`) to do this.

Once this is complete, a live-reload development server can be run with
`npm start`. This server can be accessed by visiting http://localhost:4200 in
a web browser. Every time there is a code change, the web browser will
automatically reload with the latest changes.

Alternatively, running `npm run build` will generate a `dist` folder that can be
upload onto a web server containing a *debug* version of the site. To generate a
*production* build, run `npm run build:prod`.

Debug and Production builds request the backend from different locations. These
are set in the environment files found in `/src/environments/`:
 - Debug uses `environment.ts`
 - Production uses `environment.prod.ts`

Anything else falls back to debug unless specified in `/.angular-cli.json`.

### Back-end
To get the back-end to work, the configuration file and SQLite databases need to
be generated.

#### Configuration file
The PHP scripts are configured by the file `/api/conf/settings.php`. There is a
demo in the folder which can be used as a starting point.

```php
<?php
$settings = array(
  'Database' => array(
    'Prefix' => 'blog_', // Prefix to the table names for large databases, can be left blank
    'Database' => '{path to database}' // Path to SQLite Database
  ),
  'Formats' => array(
    'ShortDateTime' => 'd M Y, H:i', // Short date format string, used in summaries
    'LongDateTime' => 'l, jS F Y, H:i T' // Long date format string, used in detail views
  ),
  'Defaults' => array(
    'PostsVisible' => 5 // Posts visible on a journal page for pagination
  )
);
```

#### Creating the SQLite database
The SQLite database is generated with the following SQL code. Note that if you
have specified a different database prefix in the settings file, you will need
to adjust the table names in this code as appropriate.

```sql
BEGIN TRANSACTION;

-- Blog posts, used by journal module
CREATE TABLE `blog_posts` (
  -- Unique identifier for the post
  `post_id`           INTEGER PRIMARY KEY,

  -- Post title
  `title`             TEXT,

  -- Post content. Expects HTML
  `content`           TEXT,

  -- Post date, as Unix timestamp
  `post_date`         INTEGER,

  -- Post status. 'publish' or 'draft' expected.
  `status`            TEXT,

  -- Space separated list of tags to associate with the post
  `tag`               TEXT,

  -- Future work: whether comments can be added
  `comment_status`    TEXT,

  -- Future work: cached number of comments
  `comment_count`     INTEGER,

  -- Post last modification date, as a Unix timestamp.
  -- NULL signifies an unmodified post
  `modification_date` INTEGER
);

-- Gallery images, used by the gallery module
CREATE TABLE `blog_gallery` (
  -- Unique identifier for the image
  `image_id`    INTEGER PRIMARY KEY,

  -- Space separated list of album ids that contain this image
  `galleries`   TEXT,

  -- File name, i.e. 'pic.jpg'. Backend controls full path to image and thumbnail
  `file`        TEXT,

  -- Image title
  `title`       TEXT,

  -- Image description
  `description` TEXT,

  -- Image date, as a Unix timestamp
  `image_date`  INTEGER
);

-- Gallery albums, used by the gallery module
CREATE TABLE `blog_albums` (
  -- Unique identifier for the album
  `album_id`    INTEGER PRIMARY KEY,

  -- Album title, displayed to users. Can use spaces, apostrophes, commas, etc.
  `title`       TEXT,

  -- Album name, used in URLs. must only be letters and numbers
  `name`        TEXT,

  -- Album description
  `description` TEXT
);
COMMIT;
```

There are a few 'gotchas' when adding data to the tables manually. Many of the
data storage decisions date back to the initial versions of the software and I
haven't changed the way this part of the system works since the initial versions.

Some general things to note:
 - `*_date` fields are Unix timestamps, which means they're stored as the number
   of seconds since 1st Jan 1970, 00:00 UTC.
 - `*_id` fields must be unique and are the way the system refers to a record.

# History
jBlog started off as a pure PHP site that I intended to integrate with the
PHP-powered web forum software I was using at the time. However, I never fully
got around to getting the integration working and after a few years I closed
down the forum software as it had been replaced with a variety of social
networks that did a better job.

I've ported it to Angular in an effort to learn the framework. The backend is
written in PHP, as that is all my web hosting provider allows me to use on my
hosting package. This backend uses an SQL database (currently SQLite) to store
content and, in the future, configuration.
