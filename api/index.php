<?php

require "./lib/api/class.request-helpers.php";
require "./lib/api/class.response-helpers.php";

parse_str($_SERVER["QUERY_STRING"], $queryStringBits);
$requestedApi = array_search("", $queryStringBits);

$apiFilePath = "./modules/module.$requestedApi.php";
if (!file_exists($apiFilePath)) {
  ResponseHelpers::respondNotFound();
  exit(0);
}

// Require settings
require "./conf/settings.php";

// Require libraries
require "./lib/extensions.string.php";
require "./lib/interface.database.php";
require "./lib/class.db-sqlite.php";

$database = new Database();
if (!$database->connect($settings["Database"])) {
  ResponseHelpers::respondServerError();
  exit(0);
}

// Enable cors for Angular dev server
if (!$settings["Environment"]["Production"]) {
  @header("Access-Control-Allow-Origin: http://localhost:4200");
}

// Run module
require $apiFilePath;
$module = new ApiModule($database);
$module->handleResponse();
