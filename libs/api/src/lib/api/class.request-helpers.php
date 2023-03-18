<?php

class RequestHelpers {
  public static function getRawValue($key, $default = NULL) {
    if (isset($_GET[$key])) {
      return $_GET[$key];
    }

    return $default;
  }

  public static function getNumericValue($key, $default) {
    $value = self::getRawValue($key);
    if (is_numeric($value)) {
      return (int)$value;
    }

    return $default;
  }
}
