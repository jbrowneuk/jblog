<?php

require "./conf/settings.php";

require "./lib/extensions.string.php";
require "./lib/interface.database.php";
require "./lib/class.db-sqlite.php";

require "./lib/framework.posts.php";

const POST_ID_QUERY = "postId";

//==============================================================================
// Sets the response headers to "not found".
//==============================================================================
function respondNotFound() {
  @header("HTTP/1.0 404 Not Found");
}

//==============================================================================
//
//==============================================================================
function generatePostsOutput($posts) {
  $output = "";
  foreach ($posts as $post) {
    if (strlen($output) > 0) {
      $output .= ",\n";
    }

    $safeTitle = StringExtensions::cleanText($post->getTitle());
    $safeContent = StringExtensions::cleanText($post->getContent());

    $parsedTags = "";
    foreach ($post->getTags() as $tag) {
      if (strlen($parsedTags) > 0) {
        $parsedTags .= ", ";
      }

      $parsedTags .= '"' . $tag . '"';
    }

    $id = '"postId": ' . $post->getId();
    $date = '"date": ' . $post->getDate();
    $title = '"title": "' . $safeTitle . '"';
    $content = '"content": "' . $safeContent . '"';
    $tags = '"tags": [' . $parsedTags . ']';
    $output .= "{{$id}, {$date}, {$title}, {$content}, {$tags}}";
  }

  return $output;
}

//==============================================================================
//
//==============================================================================
function getPostList($database) {
  global $settings;

  $queryPage = "page";
  $page = isset($_GET[$queryPage]) && is_numeric($_GET[$queryPage]) ? $_GET[$queryPage] : 1;

  $offset = $page - 1;
  if ($offset < 0) {
    $offset = 0;
  }

  $tag = "";
  $searchTerms = "";
  $posts = new PostList($database, $settings["Defaults"]["PostsVisible"], $offset, $tag, $searchTerms);

  $postCount = PostList::getTotalPostCount($database, $tag, $searchTerms);
  $totalPages = ceil($postCount / $settings["Defaults"]["PostsVisible"]);
  $output = generatePostsOutput($posts);

  @header("Content-Type:application/json; charset=utf-8");
  print <<<EOF
{
  "currentPage": $page,
  "totalPages": $totalPages,
  "data": [
$output
  ]
}
EOF;
}

function getSinglePost($database) {
  if (!is_numeric($_GET[POST_ID_QUERY])) {
    respondNotFound();
    return;
  }

  $postId = (int)$_GET[POST_ID_QUERY];
  if ($postId <= 0) {
    respondNotFound();
    return;
  }

  $posts = new PostList($database, 1, $postId, "", "");
  // Sanity check - post has to exist AND there should only be one with this ID
  if (count($posts) !== 1) {
    respondNotFound();
    return;
  }

  $output = generatePostsOutput($posts);
  @header("Content-Type:application/json; charset=utf-8");
  print <<<EOF
{
  "data": $output
}
EOF;
}

$database = new Database();
if (!$database->connect($settings["Database"]))
{
  header("HTTP/1.1 500 Internal Server Error");
  exit;
}

if (isset($_GET[POST_ID_QUERY])) {
  getSinglePost($database);
  exit;
}

getPostList($database);
