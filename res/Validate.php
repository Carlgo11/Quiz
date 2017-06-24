<?php

class Validate {
  
  /*
   * match the user's answers to the answers from the questions table.
   * @param string $user_answers The user's answers.
   * @return int
   */
  public static function validateAnswers($user_answers) {
    $correct_answers = Mysql::getAnswers();
    $result = 0;
    foreach ($user_answers as $id => $answer) {
      if ($correct_answer = explode(",", $correct_answers[$id])) {
        // Multiple correct answers
        if (in_array(strtolower($answer), $correct_answer)) {
          $result++;
        } else {
          if (strtolower($answer) == strtolower($correct_answers[$id])) {
            $result++;
          }
        }
      } else {
        // One correct answer
        if (strtolower($answer) == strtolower($correct_answers[$id])) {
          $result++;
        }
      }
    }
    return $result;
  }

}
