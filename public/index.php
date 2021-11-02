<?php

use carlgo11\quiz\Databases\MySQL;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;

require_once __DIR__ . '/../vendor/autoload.php';
$method = filter_input(5, 'REQUEST_METHOD', 513, ['flags' => 32]);

// Check if user is logged in
session_start();
if (!isset($_SESSION['group'])) {
    header('Location: /auth.php');
    die();
}

// Setup MySQL
$mysql = new MySQL();
$questions = $mysql->getQuestions();
$questions_size = sizeof($questions);
$group = $mysql->getGroup($_SESSION['group']);
$answers = null;
// Get prev answers
if (isset($_SESSION['new']) && !$_SESSION['new']) {
    $answers = $mysql->getAnswers($group->id);
}

switch ($method) {
    case 'GET':
        $loader = new FilesystemLoader([__DIR__ . '/../layouts', __DIR__ . '/../sections']);
        $twig = new Environment($loader);
        die($twig->render('index.twig', ['questions' => $questions_size, 'answers' => $answers]));
    case 'POST':
        header('Content-Type: application/json; charset=utf-8');
        $data = json_decode(file_get_contents('php://input'), TRUE);
        $question = filter_var($data['question'], 257, ['options' => ['min_range' => 1, 'max_range' => $questions_size]]);
        $answer = filter_var($data['answer'], 272, ['options' => ['regexp' => '/^([a-z])$/']]);
        $mysql->addAnswer($group->id, $question, $answer) ? http_response_code(201) : http_response_code(500);
        break;
    default:
        echo "none";
        break;
}
