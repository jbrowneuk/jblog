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

I've ported it to Angular in an effort to learn the framework. The backend is
written in PHP, as that is all my web hosting provider allows me to use on my
hosting package. This backend uses an SQL database (currently SQLite) to store
content and, in the future, configuration.

# Site administration
The administration panel in its current state is horribly insecure and hasn't
been ported from PHP completely. The port of this will come as I learn more
about Angular and develop the backend.

The PHP backend is the remainder of the old PHP version of jBlog. Unfortunately,
I'm locked in to my web hosting provider currently as my entire family uses the
mail system and it's a chore to move it to an alternate server.

# Setting up the backend
The PHP scripts are configured by the file `/api/conf/settings.php`:

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

## Creating the SQLite database
The SQLite database is generated with the following SQL code. Note that if you
have specified a different database prefix in the settings file, you will need
to adjust the table names in this code as appropriate.

```sql
BEGIN TRANSACTION;
CREATE TABLE `blog_posts` (
  `post_id`           INTEGER PRIMARY KEY, -- Unique identifier for the post
  `title`             TEXT,                -- Post title
  `content`           TEXT,                -- Post content. Expects HTML
  `post_date`         INTEGER,             -- Post date, as Unix timestamp
  `status`            TEXT,                -- Post status. 'publish' or 'draft' expected.
  `tag`               TEXT,                -- Space separated list of tags to associate with the post
  `comment_status`    TEXT,                -- Future work: whether comments can be added
  `comment_count`     INTEGER,             -- Future work: cached number of comments
  `modification_date` INTEGER              -- Post last modification date, as a Unix timestamp. NULL signifies an unmodified post
);
CREATE TABLE `blog_gallery` (
  `image_id`    INTEGER PRIMARY KEY, -- Unique identifier for the image
  `galleries`   TEXT,                -- Space separated list of album ids that contain this image
  `file`        TEXT,                -- File name, i.e. 'pic.jpg'. Backend controls full path to image and thumbnail
  `title`       TEXT,                -- Image title
  `description` TEXT,                -- Image description
  `image_date`  INTEGER              -- Image date, as a Unix timestamp
);
CREATE TABLE `blog_albums` (
  `album_id`    INTEGER PRIMARY KEY, -- Unique identifier for the album
  `title`       TEXT,                -- Album title, displayed to users. Can use spaces, apostrophes, commas, etc.
  `name`        TEXT,                -- Album name, used in URLs. must only be letters and numbers
  `description` TEXT                 -- Album description
);
COMMIT;
```

## Adding data to the tables manually
There are a few 'gotchas' when adding data to the tables. Many of the data
storage decisions date back to the initial versions of the software and I
haven't changed the way this part of the system works since the initial versions.

Some general things to note:
 - `*_date` fields are Unix timestamps, which means they're stored as the number
   of seconds since 1st Jan 1970, 00:00 UTC.
 - `*_id` fields must be unique and are the way the system refers to a record.
