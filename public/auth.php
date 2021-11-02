<?php

use carlgo11\quiz\Databases\MySQL;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;

require_once __DIR__ . '/../vendor/autoload.php';
$method = filter_input(5, 'REQUEST_METHOD', 513, ['flags' => 32]);

switch ($method) {
    case 'GET':
        $loader = new FilesystemLoader([__DIR__ . '/../layouts', __DIR__ . '/../sections']);
        $twig = new Environment($loader);
        die($twig->render('auth.twig'));
    case 'POST':
        $mysql = new MySQL();
        $group = filter_input(INPUT_POST, 'group', 513);
        session_start();
        $_SESSION['group'] = $group;
        $_SESSION['new'] = $mysql->addGroup($group);
        header("Location: /");
        die("");
    default:
        die("none");
}
