<?php

// Maximum number of posts to show on a journal page
$postsVisibleOnPage = 5;

// Whether in production mode or not
$isProduction = false;

// Calculate database file name and path from production switch
$databaseFileName = $isProduction ? 'production' : 'debug';
$databaseFilePath = './conf/' . $databaseFileName . '.sqlite';

// Prefix for database tables
$tablePrefix = 'blog_';

// Aggregated settings array - required for running the backend
$settings = array(
  'Database' => array('Prefix' => $tablePrefix, 'Database' => $databaseFilePath),
  'Formats' => array('ShortDateTime' => 'd M Y, H:i', 'LongDateTime' => 'l, jS F Y, H:i T'),
  'Defaults' => array('PostsVisible' => $postsVisibleOnPage),
  'Environment' => array('Production' => $isProduction),
  'URLs' => array('GalleryRoot' => 'http://my.site/gallery/'),
  'Paths' => array('KeyRoot' => '../../private-location/')
);
