<?php

class ResponseHelpers {
  public static function respondNotFound() {
    @header("HTTP/1.0 404 Not Found");
  }

  public static function respondServerError() {
    @header("HTTP/1.1 500 Internal Server Error");
  }

  public static function outputWithJsonHeader($obj) {
    @header("Content-Type:application/json; charset=utf-8");
    $wrapper = array("data" => $obj);
    print json_encode($wrapper);
  }
}
