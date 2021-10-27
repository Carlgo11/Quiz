<?php

namespace carlgo11\quiz;

use Exception;
use mysqli;

class MySQL implements Database
{
    private mysqli $mysqli;

    private function makeConnection(): ?mysqli
    {
        $mysql = mysqli_init();
        if ($_ENV['MYSQL_OPTIONS']) $mysql->options($_ENV['MYSQL_OPTIONS']);
        if ($_ENV['MYSQL_TLS_KEY'] && $_ENV['MYSQL_TLS_CERT']) $mysql->ssl_set($_ENV['MYSQL_TLS_KEY'], $_ENV['MYSQL_TLS_CERT']);
        $mysql->real_connect($_ENV['MYSQL_HOST'], $_ENV['MYSQL_USER'], $_ENV['MYSQL_PASSWORD'], $_ENV['MYSQL_DATABASE'], $_ENV['MYSQL_PORT'], NULL, 'utf8mb4');
        if (!$mysql) throw new Exception(mysqli_error($mysql));
        return $mysql;
    }

    public function __construct()
    {
        $this->mysqli = $this->makeConnection();
    }

    public function __destruct()
    {
        // TODO: Implement __destruct() method.
    }

    public function __set(string $name, mixed $value)
    {
        // TODO: Implement __set() method.
    }

    public function __get(?string $name)
    {
        // TODO: Implement __get() method.
    }

    public function __debugInfo()
    {
        // TODO: Implement __debugInfo() method.
    }
}