<?php

require "./conf/settings.php";

require "./lib/extensions.string.php";
require "./lib/interface.database.php";
require "./lib/class.db-sqlite.php";

require "./lib/framework.gallery.php";

const DEFAULT_ALBUM_ID = 0;
const IMAGES_PER_PAGE = 16;
const GALLERY_ROOT = "/art/";
const THUMBNAIL_URL = GALLERY_ROOT . "thumbs/";

function generateFolderView($requestedPage, $database) {
  $requestedAlbum = isset($_GET["albumId"]) ? $_GET["albumId"] : DEFAULT_ALBUM_ID;
  $numberImagesToLoad = isset($_GET["count"]) && is_numeric($_GET["count"]) ? (int)$_GET["count"] : IMAGES_PER_PAGE;

  if ($numberImagesToLoad <= 0) {
    $numberImagesToLoad = IMAGES_PER_PAGE;
  }

  // Look up album - returns null if it doesn't exist.
  $currentAlbum = GalleryAlbumList::getAlbumById($database, $requestedAlbum);
  $currentAlbumId = $currentAlbum != NULL ? $currentAlbum->getId() : DEFAULT_ALBUM_ID;

  $galleryAlbumCache = new GalleryAlbumList($database);
  $galleryImages = new GalleryImageList($database, $numberImagesToLoad, $requestedPage, $currentAlbumId);
  $output = "";

  foreach ($galleryImages as $image) {
    if (strlen($output) > 0) {
      $output .= ", ";
    }

    $containingGalleries = "";
    $galleryNumbers = explode(' ', $image->getGalleries());
    foreach ($galleryNumbers as $id => $albumId) {
      if (strlen($containingGalleries) > 0) {
        $containingGalleries .= ", ";
      }

      $albumsFromCache = array_filter((array)$galleryAlbumCache, function($e) use ($albumId) { return $e->getId() == $albumId; });
      if (count($albumsFromCache) > 0)
      {
        $first = array_values($albumsFromCache)[0];
        $containingGalleries .= '"' . $first->getTitle() . '"';
      }
    }

    $imageId = '"imageId": ' . $image->getId();
    $title = '"title": "' . $image->getTitle() . '"';
    $galleries = '"galleries": [' . $containingGalleries . ']';
    $thumbnailUrl = '"thumbnailUrl": "' . THUMBNAIL_URL . $image->getImageUri() . '"';
    $output .= "{{$imageId}, {$title}, {$galleries}, {$thumbnailUrl}}";
  }

  print <<<EOF
{
  "data": [ $output ]
}
EOF;
}

$database = new Database();
if (!$database->connect($settings["Database"]))
{
  header("HTTP/1.1 500 Internal Server Error");
  exit;
}

$queryPage = "page";
$page = isset($_GET[$queryPage]) && is_numeric($_GET[$queryPage]) ? $_GET[$queryPage] : 1;

$offset = $page - 1;
if ($offset < 0) {
  $offset = 0;
}

@header("Content-Type:application/json; charset=utf-8");

if (isset($_GET["images"])) {
  generateFolderView($offset, $database);
  return;
}

if (isset($_GET["albumdata"])) {
  print <<<EOF
{
  "data": {
    "albumId": 0,
    "title": "Latest works",
    "description": "The gallery is being rewritten from scratch, and is lacking a lot of features currently. This page shows the last 16 images I have uploaded."
  }
}
EOF;
  return;
}

print "{}";
