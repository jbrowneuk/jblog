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
const IMAGE_URL = GALLERY_ROOT . "images/";

function respondNotFound() {
  @header("HTTP/1.0 404 Not Found");
}

function outputWithHeader($string) {
  @header("Content-Type:application/json; charset=utf-8");
  print $string;
}

function generateFolderView($database) {
  $queryPage = "page";
  $page = isset($_GET[$queryPage]) && is_numeric($_GET[$queryPage]) ? $_GET[$queryPage] : 1;

  $requestedPage = $page - 1;
  if ($requestedPage < 0) {
    $requestedPage = 0;
  }

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

  $jsonString = "{ \"data\": [ $output ] }";
  outputWithHeader($jsonString);
}

function generateAlbumInfoView($database) {
  $title = "Latest works";
  $description = "The gallery is being rewritten from scratch, and is lacking a lot of features currently. This page shows all images I have uploaded, latest first.";
  $requestedAlbum = isset($_GET["albumId"]) && is_numeric($_GET["albumId"]) ? (int)$_GET["albumId"] : DEFAULT_ALBUM_ID;
  if ($requestedAlbum < 0) {
    $requestedAlbum = DEFAULT_ALBUM_ID;
  }

  // Album 0 is a special case - it's the "latest uploads" album
  if ($requestedAlbum > 0) {
    $currentAlbum = GalleryAlbumList::getAlbumById($database, $requestedAlbum);
    if ($currentAlbum === NULL) {
      respondNotFound();
      return;
    }

    $title = StringExtensions::cleanText($currentAlbum->getTitle());
    $description = StringExtensions::cleanText($currentAlbum->getDescription());
  }

  $imagesPerPage = IMAGES_PER_PAGE;
  $totalImages = GalleryAlbumList::getTotalImagesInAlbum($database, $requestedAlbum);
  $totalPages = ceil($totalImages / $imagesPerPage);

  $jsonString = <<<EOF
{
  "data": {
    "albumId": 0,
    "title": "{$title}",
    "description": "{$description}",
    "imagesInAlbum": {$totalImages},
    "imagesPerPage": {$imagesPerPage},
    "totalPages": {$totalPages}
  }
}
EOF;
  outputWithHeader($jsonString);
}

function generateImageView($database) {
  $queryId = "imageId";
  $requestedImage = isset($_GET[$queryId]) && is_numeric($_GET[$queryId]) ? (int)$_GET[$queryId] : -1;
  if ($requestedImage < 1) {
    returnNotFound();
    return;
  }

  $image = GalleryImageList::getImageById($database, $requestedImage);
  if ($image == null) {
    respondNotFound();
    return;
  }

  $safeTitle = StringExtensions::cleanText($image->getTitle());
  $safeDescription = StringExtensions::cleanText($image->getDescription());
  $url = IMAGE_URL . $image->getImageUri();

  $jsonString = <<<EOF
{
  "data": {
    "title": "{$safeTitle}",
    "date": {$image->getDate()},
    "description": "{$safeDescription}",
    "url": "{$url}",
    "containingAlbum": "none",
    "featured": "false"
  }
}
EOF;
  outputWithHeader($jsonString);
}

$database = new Database();
if (!$database->connect($settings["Database"]))
{
  header("HTTP/1.1 500 Internal Server Error");
  exit;
}

if (isset($_GET["images"])) {
  generateFolderView($database);
  exit;
}

if (isset($_GET["albumdata"])) {
  generateAlbumInfoView($database);
  exit;
}

if (isset($_GET["imagedata"])) {
  generateImageView($database);
  exit;
}

respondNotFound();
