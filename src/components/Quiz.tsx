import { Chart } from 'chart.js';
import React, { useEffect, useRef, useState } from 'react';

const Quiz = () => {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [questions, setQuestions] = useState([
    {
      question: 'Which is the largest country in the world by population?',
      choices: ['India', 'USA', 'China', 'Russia'],
      correctChoiceIndex: 0,
    },
    {
      question: 'When did the second world war end?',
      choices: ['1945', '1939', '1944', '1942'],
      correctChoiceIndex: 0,
    },
    {
      question: 'Which was the first country to issue paper currency?',
      choices: ['Sydney', 'Athens', 'Atlanta', 'Beijing'],
      correctChoiceIndex: 2,
    },
    {
      question: 'Who invented the telephone?',
      choices: [
        'Albert Einstein',
        'Alexander Graham Bell',
        'Isaac Newton',
        'Marie Curie',
      ],
      correctChoiceIndex: 1,
    },
  ]);

  const handleAnswer = (selectedChoiceIndex: any) => {
    const currentQuestion = questions[currentQuestionIndex];
  
    if (selectedChoiceIndex === currentQuestion.correctChoiceIndex) {
      setScore(score + 1);
    }
  
    if (currentQuestionIndex === questions.length - 1) {
      setCurrentQuestionIndex(-1);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  
    // Store the answer in local storage with a unique key
    localStorage.setItem(`answer-${currentQuestionIndex}`, selectedChoiceIndex);
  };
  
  
  const handleReset = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
  
    // Remove all stored answers from local storage
    questions.forEach((_, index) => {
      localStorage.removeItem(`answer-${index}`);
    });
  };
  
  const handleRestart = () => {
    handleReset();
  };
  const chartRef = useRef({});
  useEffect(() => {
    // Collect the answers from local storage
    const answers = questions.map((question, index) => {
      const answerIndex = localStorage.getItem(`answer-${index}`);
      return answerIndex !== null ? parseInt(answerIndex, 10) : -1;
    });

    // Count the number of correct answers for each question
    const correctAnswers = questions.map((question, index) => {
      const answerIndex = answers[index];
      return answerIndex === question.correctChoiceIndex ? 1 : 0;
    });    

    const chart = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: questions.map((_, index) => `Question ${index + 1}`),
        datasets: [{
          label: 'Correct Answers',
          data: correctAnswers,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            stepSize: 1,
          }
        }
      }
    });

    // Clean up the chart when the component unmounts
    return () => {
      chart.destroy();
    };
  }, [questions]);
  const currentQuestion = questions[currentQuestionIndex];

  if (currentQuestionIndex === -1) {
    return (
      <div>
        <h2 className="score">Final Score: {score}</h2>
        <div>
          <canvas ref={chartRef}></canvas>
        </div>
        <button className="restart" onClick={handleRestart}>Restart Quiz</button>
      </div>
    );
  }

  return (
    <div>
      <h2 className='question'>{currentQuestion.question}</h2>
      <ul className="options">
        {currentQuestion.choices.map((choice, index) => (
          <li key={index}>
            <input
              type="radio"
              name={`answer-${currentQuestionIndex}`}
              value={index}
              onClick={() => handleAnswer(index)}
              checked={false}
            />
            {choice}
          </li>
        ))}
      </ul>
      <button className="next start" onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>Next</button>
      <p className="score">Current Score: {score}</p>
    </div>
  );
};

export default Quiz;
