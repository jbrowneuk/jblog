<?php

class StringExtensions
{
  // Safer than empty($value) because "0" is not an empty string
  public static function isEmpty($value) {
    return !isset($value) || strlen(trim($value)) === 0;
  }

  public static function cleanText($input) {
    $safeContent = str_replace(["\r\n", "\r", "\n"], "\\n", $input);
    $safeContent = str_replace("\"", "\\\"", $safeContent);
    return $safeContent;
  }
}
