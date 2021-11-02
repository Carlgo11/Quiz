<?php

namespace carlgo11\quiz;

class Question
{
    private string $question;
    private string $answer;

    public function __construct(string $question, string $answer)
    {
        $this->question = filter_var($question, 257, ['options' => ['min_range' => 1]]);
        $this->answer = filter_var($answer, 272, ['options' => ['regexp' => '/^([a-z])$/']]);
    }

    public function __get(string $name): mixed
    {
        return $this->$name;
    }

}