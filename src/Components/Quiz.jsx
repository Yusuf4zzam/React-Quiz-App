import { useState, useCallback } from "react";
import questions from "../question.js";
import completeImgLogo from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
  const [userAnswers, setUsetAnswers] = useState([]);
  const questionIndex = userAnswers.length;

  const [score, setScore] = useState(0);

  const handleClickBtn = useCallback(
    function handleClickBtn(e) {
      setUsetAnswers((prev) => [...prev, e]);

      if (e === questions[questionIndex].answers[0]) {
        setScore((prev) => prev + 1);
      }
    },
    [questionIndex]
  );

  const handleSkipAnswer = useCallback(() => {
    handleClickBtn(null);
  }, [handleClickBtn]);

  const isAnswersCompleted = userAnswers.length === questions.length;

  if (isAnswersCompleted) {
    return (
      <div id="summary">
        <img src={completeImgLogo} alt="Troghy Logo" />
        <h2>Quiz Completed</h2>
        <p>
          You have got {score} from {questions.length}
        </p>
      </div>
    );
  }

  const shuffledQuestions = [...questions[questionIndex].answers];

  shuffledQuestions.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={questionIndex}
          timeout={15000}
          onTimeout={handleSkipAnswer}
        />
        <p className="question-done">
          Question {questionIndex + 1} of {questions.length}
        </p>
        <h2>{questions[questionIndex].text}</h2>

        <ul id="answers">
          {shuffledQuestions.map((e, i) => (
            <li key={i} className="answer">
              <button onClick={() => handleClickBtn(e)}>{e}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
