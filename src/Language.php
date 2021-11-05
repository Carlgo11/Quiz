<?php

namespace carlgo11\quiz;

class Language
{
    public function __construct()
    {
        $file = json_decode(file_get_contents(__DIR__ . '/../language.json'));
        var_dump(json_decode($file));
        return json_decode($file);
    }
}