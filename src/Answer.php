<?php

namespace carlgo11\quiz;

class Answer
{

    private string $answer;

    public function __construct(string $answer)
    {
        $this->answer = filter_var($answer, 272, ['options' => ['regexp' => '/^([a-z])$/']]);
    }

    public function __toString(): string
    {
        return $this->answer;
    }
}