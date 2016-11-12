<?php

require "./conf/settings.php";

require "./lib/extensions.string.php";
require "./lib/interface.database.php";
require "./lib/class.db-sqlite.php";

require "./lib/framework.posts.php";

$database = new Database();
if (!$database->connect($settings["Database"]))
{
  header("HTTP/1.1 500 Internal Server Error");
  exit;
}

$offset = 0;
$tag = "";
$searchTerms = "";
$posts = new PostList($database, $settings["Defaults"]["PostsVisible"], $offset, $tag, $searchTerms);

$output = "";
foreach ($posts as $post) {
  if (strlen($output) > 0) {
    $output .= ",\n";
  }

  $safeContent = str_replace(["\r\n", "\r", "\n"], "\\n", $post->getContent());
  $safeContent = str_replace("\"", "\\\"", $safeContent);

  $id = '"postId": ' . $post->getId();
  $title = '"title": "' . $post->getTitle() . '"';
  $content = '"content": "' . $safeContent . '"';
  $tags = '"tags": []';
  $output .= "{{$id}, {$title}, {$content}, {$tags}}";
}

@header("Content-Type:application/json");
print <<<EOF
{
  "data": [
$output
  ]
}
EOF;
