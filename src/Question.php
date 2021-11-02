<?php

namespace carlgo11\quiz;

class Question
{
    private int $question;

    public function __construct(int $question)
    {
        $this->question = intval(filter_var($question, 257, ['options' => ['min_range' => 1]]));
    }

    public function __toString(): string
    {
        return $this->question;
    }

}