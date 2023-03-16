-- SQL file to set up the SQL Database the backend uses.
-- Refer to README.md for instructions

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
