<?php

namespace carlgo11\quiz;

class Config
{
    protected array $_data;

    public function __construct()
    {
        $file = file_get_contents(__DIR__ . "/../config.json");
        $this->_data = json_decode((string)$file);
        $this->_data = json_decode((string)$file);
    }

    public function __get(string $name): mixed
    {
        return $this->_data[$name] ?? null;
    }

}