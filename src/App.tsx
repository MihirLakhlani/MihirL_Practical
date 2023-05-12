import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Quiz from './components/Quiz';

const App = () => {
  return (
    <div className="App">
      <h1>Welcome to My Quiz App!</h1>
      <Link to="/quiz"><button className='start'>Start the Quiz</button></Link>
    </div>
  )
}

const Root = () => {
  return (
   
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    
  )
}

export default Root;
