<?php

// =============================================================================
// Back-end API configuration file template
// =============================================================================

// Whether in production mode or not
$isProduction = false;

// Maximum number of posts visible on a journal page for pagination
$postsVisibleOnPage = 5;

// Prefix for database tables to allow for multiple configurations in a single db
// Can be left blank
$tablePrefix = 'blog_';

// Date and time formats
$dateTimeFormatShort = 'd M Y, H:i'; // Used in summaries
$dateTimeFormatLong = 'l, jS F Y, H:i T'; // Used in detail views

// -----------------------------------------------------------------------------
// Paths and URLs
// -----------------------------------------------------------------------------
$databaseFilePath = './conf/debug.sqlite'; // your database file
$keyFileDirectory = '/path/to/key-directory'; // directory containing the auth keys, should not be accessible to the web
$galleryRootUrl = 'https://my.site/gallery/'; // URL to the gallery page, as requested by user

// =============================================================================
// Aggregated settings array (this value is used by the back-end API)
// (i.e. only $settings is required in this file if you want to simplify)
// =============================================================================
$settings = array(
  'Database' => array('Prefix' => $tablePrefix, 'Database' => $databaseFilePath),
  'Formats' => array('ShortDateTime' => $dateTimeFormatShort, 'LongDateTime' => $dateTimeFormatLong),
  'Defaults' => array('PostsVisible' => $postsVisibleOnPage),
  'Environment' => array('Production' => $isProduction),
  'URLs' => array('GalleryRoot' => $galleryRootUrl),
  'Paths' => array('KeyRoot' => $keyFileDirectory)
);
