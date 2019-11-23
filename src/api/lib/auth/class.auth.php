<?php

use \Firebase\JWT\JWT;

define('KEY_ALGORITHM', 'RS256');

class JwtAuthentication
{
  private $publicKey;
  private $privateKey;

  public function loadKeys()
  {
    $this->privateKey = file_get_contents('../../keys/jwtRS256.key');
    $this->publicKey = file_get_contents('../../keys/jwtRS256.key.pub');
  }

  public function getAuthInfo($input)
  {
    $data = null;

    try
    {
      $data = JWT::decode($input, $this->publicKey, array(KEY_ALGORITHM));
    }
    finally
    {
      return $data;
    }
  }

  public function setAuthInfo($info = array())
  {
    $issueTime = time();
    $expiryTime = $issueTime + 60 * 5;

    $token = array(
      'iss' => 'jbrowne.io',
      'aud' => 'jbrowne.io',
      'iat' => $issueTime,
      'exp' => $expiryTime
    );

    // Add custom elements to token
    if (is_array($info) && count($info) > 0)
    {
      $token = array_merge($token, $info);
    }

    return JWT::encode($token, $this->privateKey, KEY_ALGORITHM);
  }
}
