<?php

require "lib/auth/class.auth.php";

class ApiModule {

  private $db;
  private $settings;
  private $auth;

  //============================================================================
  // Constructor.
  //============================================================================
  public function __construct($db, $settings) {
    $this->db = $db;
    $this->settings = $settings;

    $this->auth = new JwtAuthentication();
    $this->auth->loadKeys($settings);
  }

  //============================================================================
  // Main entry point.
  //============================================================================
  public function handleResponse() {
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
      return $this->handlePost();
    }

    $httpAuthHeader = $_SERVER["HTTP_AUTHORIZATION"];
    if (!$httpAuthHeader) {
      return ResponseHelpers::respondUnauthorized();
    }

    $this->reflectUserJwt($httpAuthHeader);
  }

  //============================================================================
  // Decode the user token and reflect user info
  //============================================================================
  private function reflectUserJwt($httpAuthHeader) {
    $authInfo = $this->auth->getAuthInfo($httpAuthHeader);
    if (!$authInfo) {
      return ResponseHelpers::respondUnauthorized();
    }

    // Simply reflect the decoded content
    ResponseHelpers::outputWithJsonHeader((array)$authInfo);
  }

  private function handlePost() {
    $username = $_POST["username"];
    $password = $_POST["password"];
    if (!$username || !$password) {
      return ResponseHelpers::respondUnauthorized();
    }

    // Search for user in DB
    $hash = $this->getUserHash($username);
    if (!$hash || !password_verify($password, $hash)) {
      return ResponseHelpers::respondUnauthorized();
    }

    // Generate session token
    $session = array("uid" => $username);
    $jwt = $this->auth->setAuthInfo($session);
    ResponseHelpers::outputWithPlainTextHeader($jwt);
  }

  private function getUserHash($username) {
    $this->db->setTableScope("users");
    $where = array("username" => $username);
    $field = "hash";
    $results = $this->db->getWhere($field, $where);

    if (count($results) !== 1) {
      return null;
    }

    return $results[0][$field];
  }

}
