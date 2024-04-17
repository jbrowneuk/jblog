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
    $httpAuthHeader = $this->getAuth();
    $authInfo = $this->auth->getAuthInfo($httpAuthHeader);
    if (!$authInfo) {
      return ResponseHelpers::respondUnauthorized();
    }

    parse_str($_SERVER["QUERY_STRING"], $queryStringBits);
    $actionKey = "action";
    if (!isset($queryStringBits[$actionKey])) {
      return ResponseHelpers::respondNotFound();
    }

    $action = $queryStringBits[$actionKey];
    $adminApiPath = "./modules/admin/module.admin.$action.php";
    if (!file_exists($adminApiPath)) {
      return ResponseHelpers::respondNotFound();
    }

    require $adminApiPath;
    $adminApi = new AdminModule($this->db, $this->settings, $authInfo);
    $adminApi->handleResponse();
  }

  //============================================================================
  // Convenience method to get authentication token
  //============================================================================
  private function getAuth() {
    // Some servers provide REDIRECT_AUTH instead of HTTP_AUTH
    $redirectAuth = $_SERVER["REDIRECT_HTTP_AUTHORIZATION"];
    $httpAuth = $_SERVER["HTTP_AUTHORIZATION"];
    return isset($redirectAuth) ? $redirectAuth : $httpAuth;
  }

}
