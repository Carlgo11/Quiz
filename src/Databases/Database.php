<?php

namespace carlgo11\quiz\Databases;

interface Database
{

    public function __construct();

    public function __destruct();

    public function __set(string $name, $value);

    public function __get(?string $name);

    public function __debugInfo();

}