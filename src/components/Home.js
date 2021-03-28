import axios from 'axios';
import React, { useState } from 'react';

import "./home.css";
import Question from './Question';

const Home = () => {

    const [category, setCategory] = useState('&category=');
    const [difficulty, setDifficulty] = useState('&difficulty=');
    const [response, setResponse] = useState([]);
    const [counter, setCounter] = useState(0);
    const [points, setPoints] = useState(0);
    const [answerIndex, setAnswerIndex] = useState(null);
    const [haventClicked, setHaventClicked]= useState(true);

    const onSubmitHandler = () => {
        axios.get("https://opentdb.com/api.php?amount=10"+category+difficulty)
        .then(response => {
            setResponse(response.data.results);
        }).catch(err => {
            console.log(err);
        });
    };

    let page = (
        <div className="selectTest">
            <h1 className="quizStart">Choose your quiz </h1>
                <label htmlFor="Category">Choose Category</label>
                <select onChange={(e) => setCategory(category + e.target.value)} name="category" className="Category">
                    <option>Any</option>
                    <option value={15}>Video games</option>
                    <option value={31}>Anime/Manga</option>
                    <option value={21}>Sports</option>
                    <option value={18}>Computer Science</option>
                </select>
                <label htmlFor="Difficulty">Choose Difficulty</label>
                <select onChange={(e) => setDifficulty(difficulty + e.target.value)} name="difficulty" className="Difficulty">
                    <option>Any</option>
                    <option value={"easy"}>Easy</option>
                    <option value={"medium"}>Medium</option>
                    <option value={"hard"}>Hard</option>
                </select>
            <button onClick={() => onSubmitHandler()}>Start</button>
        </div>
    )

    if (response.length !== 0 && counter < 10) {
        page = (
            <div className='testQuestions'>
                <Question 
                    question={response[counter].question}
                    correct={response[counter].correct_answer}
                    incorrect={response[counter].incorrect_answers}
                    answerIndex={answerIndex}
                    setAnswerIndex={setAnswerIndex}
                    setHaventClicked={setHaventClicked}
                    haventClicked={haventClicked}
                    points={points}
                    setPoints={setPoints}
                />
                <button onClick={() => {
                    setCounter(counter+1);
                    setAnswerIndex(null);
                    setHaventClicked(true)
                    }}>Next</button>
            </div>
        );
    } else if (counter === 10) {
        page = (
            <div>
                <h1 className="finalScore">You have scored {points} points</h1>
                <button onClick={() => {setResponse([]); 
                        setCounter(0); 
                        setPoints(0);
                        setCategory('&category=');
                        setDifficulty('&difficulty=')}}>Start again</button>
            </div>
        )
    };

    return page;
};

export default Home;
