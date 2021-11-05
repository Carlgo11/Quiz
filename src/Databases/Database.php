<?php

namespace carlgo11\quiz\Databases;

use carlgo11\quiz\Group;

interface Database
{
    public function __construct();

    public function __destruct();

    public function getQuestions(): array;

    public function addAnswer(int $group, int $question, string $answer): bool;

    public function getAnswers(int $group): array;

    public function addGroup(string $name): bool;

    public function getGroup(string $name): ?Group;

    public function __debugInfo(): array;
}