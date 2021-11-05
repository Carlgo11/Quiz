<?php

namespace carlgo11\quiz\Databases;

use carlgo11\quiz\Group;
use carlgo11\quiz\Question;
use Exception;
use mysqli;

class MySQL implements Database
{
    private mysqli $mysqli;

    /**
     * @throws Exception
     */
    private function makeConnection(): mysqli
    {
        $mysql = mysqli_init();
        if ($_ENV['MYSQL_OPTIONS']) $mysql->options($_ENV['MYSQL_OPTIONS']);
        if ($_ENV['MYSQL_TLS_KEY'] && $_ENV['MYSQL_TLS_CERT']) $mysql->ssl_set($_ENV['MYSQL_TLS_KEY'], $_ENV['MYSQL_TLS_CERT']);
        $mysql->real_connect($_ENV['MYSQL_HOST'], $_ENV['MYSQL_USER'], $_ENV['MYSQL_PASSWORD'], $_ENV['MYSQL_DATABASE'], $_ENV['MYSQL_PORT']);
        return $mysql ? $mysql : throw new Exception(mysqli_error($mysql));
    }

    /**
     * @throws Exception
     */
    public function __construct()
    {
        return $this->mysqli = $this->makeConnection();
    }

    public function __destruct()
    {
        $this->mysqli->close();
    }

    public function getAnswers(int $group): array
    {
        $query = $this->mysqli->prepare('SELECT `question`, `answer` FROM `answers` WHERE group_id = ?');
        $query->bind_param('i', $group);
        $query->execute();
        $fetch = $query->get_result();
        $result = [];
        while ($row = $fetch->fetch_assoc()) {
            $result[$row['question']] = $row['answer'];
        }
        return $result;
    }

    public function addAnswer(int $group, int $question, string $answer): bool
    {
        $query = $this->mysqli->prepare('INSERT INTO `answers` (group_id, question, answer) VALUE (?, ?, ?) ON DUPLICATE KEY UPDATE answer=?');
        $query->bind_param('iiss', $group, $question, $answer, $answer);
        $result = $query->execute();
        $query->close();
        return $result;
    }

    public function getQuestions(): array
    {
        $query = $this->mysqli->prepare('SELECT `question`, `answer` FROM `questions`');
        $query->execute();
        $fetch = $query->get_result();
        $result = [];
        while ($row = $fetch->fetch_assoc()) {
            $question = new Question($row['question']);
            array_push($result, $question);
        }
        return $result;
    }

    public function addGroup(string $name): bool
    {
        $query = $this->mysqli->prepare('INSERT INTO `groups` (`name`) VALUE (?)');
        $query->bind_param('s', $name);
        $result = $query->execute();
        $query->close();
        return $result;
    }

    public function getGroup(string $name): ?Group
    {
        $query = $this->mysqli->prepare('SELECT `id`, `name` FROM `groups` WHERE name = ?');
        $query->bind_param('s', $name);
        $query->execute();
        $fetch = $query->get_result();
        $row = $fetch->fetch_assoc();
        if (isset($row['id']) && isset($row['name'])) return new Group($row['id'], $row['name']);
        return null;
    }

    public function __debugInfo(): array
    {
        return [
            'ServerInfo' => $this->mysqli->get_server_info(),
            'Connected' => $this->mysqli->get_connection_stats(),
            'Errors' => $this->mysqli->error_list,
            'Warnings' => $this->mysqli->get_warnings()
        ];
    }
}