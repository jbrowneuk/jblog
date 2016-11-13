<?php

require "./conf/settings.php";

require "./lib/extensions.string.php";
require "./lib/interface.database.php";
require "./lib/class.db-sqlite.php";

require "./lib/framework.posts.php";

function cleanText($input) {
  $safeContent = str_replace(["\r\n", "\r", "\n"], "\\n", $input);
  $safeContent = str_replace("\"", "\\\"", $safeContent);
  return $safeContent;
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

$tag = "";
$searchTerms = "";
$posts = new PostList($database, $settings["Defaults"]["PostsVisible"], $offset, $tag, $searchTerms);

$postCount = PostList::getTotalPostCount($database, $tag, $searchTerms);
$totalPages = ceil($postCount / $settings["Defaults"]["PostsVisible"]);

$output = "";
foreach ($posts as $post) {
  if (strlen($output) > 0) {
    $output .= ",\n";
  }

  $safeTitle = cleanText($post->getTitle());
  $safeContent = cleanText($post->getContent());

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

@header("Content-Type:application/json");
print <<<EOF
{
  "currentPage": $page,
  "totalPages": $totalPages,
  "data": [
$output
  ]
}
EOF;
