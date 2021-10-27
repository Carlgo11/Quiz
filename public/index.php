<?php

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

require_once __DIR__ . '/../vendor/autoload.php';
$questions = 5;
switch (filter_input(5, 'REQUEST_METHOD', 513, ['flags' => 32])) {
    case 'GET':
        $loader = new FilesystemLoader([__DIR__ . '/../layouts', __DIR__ . '/../sections']);
        $twig = new Environment($loader);
        echo $twig->render('index.twig', ['questions' => $questions]);
        break;
    case 'POST':
        header('Content-Type: application/json; charset=utf-8');
        $data = json_decode(file_get_contents('php://input'), TRUE);
        $question = filter_var($data['question'], 257, ['options' => ['min_range' => 1, 'max_range' => $questions]]);
        $answer = filter_var($data['answer'], 272, ['options' => ['regexp' => '/^([a-z])$/']]);
        die(json_encode([$question, $answer]));
}
