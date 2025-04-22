import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // Set up the useEffect for countdown timer
  useEffect(() => {
    // Start a timer to decrement the remaining time every second
    const timer = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup function to clear the timer if the component is unmounted or effect is rerun
    return () => clearTimeout(timer);
  }, [timeRemaining]); // Depend on timeRemaining, so it runs whenever it changes

  useEffect(() => {
    // When timeRemaining hits 0, reset it to 10 and call the onAnswered function
    if (timeRemaining === 0) {
      setTimeRemaining(10); // Reset the time
      onAnswered(false); // Notify the parent that the time is up
    }
  }, [timeRemaining, onAnswered]); // Re-run this effect whenever timeRemaining changes

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset time when the user selects an answer
    onAnswered(isCorrect); // Notify the parent about the answer
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
