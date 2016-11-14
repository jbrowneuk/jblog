<?php

@header("Content-Type:application/json; charset=utf-8");

if (isset($_GET["images"])) {
  print <<<EOF
{
  "data": [
    {
      "imageId": 2,
      "title": "Title 2",
      "galleries": [ "Vector", "Also Vector" ],
      "thumbnailUrl": "http://jbrowne.me.uk/art/thumbs/trainride-f02.jpg"
    },
    {
      "imageId": 1,
      "title": "Title 1",
      "galleries": [ "Vector" ],
      "thumbnailUrl": "http://jbrowne.me.uk/art/thumbs/trainride-f02.jpg"
    }
  ]
}
EOF;
  return;
}

if (isset($_GET["albumdata"])) {
  print <<<EOF
{
  "data": {
    "albumId": 0,
    "title": "Latest works",
    "description": "Album description"
  }
}
EOF;
  return;
}

print "{}";
