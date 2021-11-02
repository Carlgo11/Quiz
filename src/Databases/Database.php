<?php

namespace carlgo11\quiz\Databases;

interface Database
{

    public function __construct();

    public function __destruct();

    public function getQuestions();

    public function __debugInfo();

}