<?php

// Require settings
require "./conf/settings.php";

@header("Content-Type:text/plain; charset=utf-8");

if (file_exists($settings["Database"]["Database"])) {
  print "Database already exists. Setup aborting.";
  exit(1);
}

// Require libraries
require "./lib/extensions.string.php";
require "./lib/interface.database.php";
require "./lib/class.db-sqlite.php";

/**
 * Dangerous class that needs refactoring.
 */
class AdminDatabase extends Database {
  public function create($tableName, $fields) {
    $db = $this->getEngineInstance();
    $prefix = $this->getTablePrefix();

    $fullTableName = $prefix . $tableName;

    $sql = "CREATE TABLE `$fullTableName`";
    $sql .= " ( $fields )";

    $db->exec($sql);

    print "Attempted to create $fullTableName\n";
  }
}

$database = new AdminDatabase();
if (!$database->connect($settings["Database"])) {
  print "Unable to initialise database backend.";
  exit(1);
}

$fieldsAlbums = "`album_id` INTEGER UNIQUE,
  `title` TEXT,
  `name` TEXT,
  `description` TEXT,
  PRIMARY KEY(`album_id`)";
$database->create('albums', $fieldsAlbums);

$fieldsGallery = "`image_id` INTEGER UNIQUE,
  `galleries` TEXT,
  `file` TEXT,
  `title` TEXT,
  `description` TEXT,
  `image_date` INTEGER,
  PRIMARY KEY(`image_id`)";
$database->create('gallery', $fieldsGallery);

$fieldsPosts = "`post_id` INTEGER UNIQUE,
  `title` TEXT,
  `content` TEXT,
  `post_date` INTEGER,
  `status` TEXT,
  `tag` TEXT,
  `comment_status` TEXT,
  `comment_count` INTEGER,
  `modification_date` INTEGER,
  PRIMARY KEY(`post_id`)";
$database->create('posts', $fieldsPosts);

$fieldsProjects = "`name` TEXT UNIQUE,
  `title` TEXT,
  `summary` TEXT,
  `info` TEXT,
  `link` TEXT,
  `resourcesUrl` TEXT,
  PRIMARY KEY(`name`)";
$database->create('projects', $fieldsProjects);

print "Complete.";
