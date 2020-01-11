<?php

class ResponseHelpers {
  public static function respondNotFound() {
    @header($_SERVER["SERVER_PROTOCOL"] . " 404 Not Found");
  }

  public static function respondUnauthorized() {
    @header($_SERVER["SERVER_PROTOCOL"] . " 401 Unauthorized");
  }

  public static function respondServerError() {
    @header($_SERVER["SERVER_PROTOCOL"] . " 500 Internal Server Error");
  }

  public static function respondNoContent() {
    @header($_SERVER["SERVER_PROTOCOL"] . " 204 No Content");
  }

  public static function respondBadRequest() {
    @header($_SERVER["SERVER_PROTOCOL"] . " 400 Bad Request");
  }

  public static function outputWithJsonHeader($obj) {
    @header("Content-Type:application/json; charset=utf-8");
    print json_encode($obj);
  }

  public static function outputWithPlainTextHeader($string) {
    @header("Content-Type:text/plain; charset=utf-8");
    print $string;
  }
}
