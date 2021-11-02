<?php

namespace carlgo11\quiz;

class Group
{
    private string $name;
    private int $id;

    public function __construct(int $id, string $name)
    {
        $this->id = $id;
        $this->name = $name;
    }

    public function __get(string $name): mixed
    {
        return $this->$name;
    }
}