import React, { useEffect, useState } from 'react';

import './question.css';
import { makeStyles} from '@material-ui/styles';


const Question = ({question, correct, incorrect, setAnswerIndex, answerIndex, haventClicked, setHaventClicked}) => {

    const [points, setPoints] = useState(0);
    const [answers, setAnswers] = useState([]);
    const useStyles = makeStyles({
        rightAnswer: {
          backgroundColor: '#B8F749'
        },
        incorrectAnswer: {
            backgroundColor: '#FB0D0D'
        }
    });

    
    const classes = useStyles();

    useEffect(() => {
        let temporaryArray = [...incorrect, correct];
        let currentIndex = temporaryArray.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            let temporaryValue = temporaryArray[currentIndex];
            temporaryArray[currentIndex] = temporaryArray[randomIndex];
            temporaryArray[randomIndex] = temporaryValue;          
        }
        setAnswers(temporaryArray);

    },[correct, incorrect]);

    const onClickHandler = (value, index) => {

        if (haventClicked){
            setAnswerIndex(index)
        }

        if (value === correct && haventClicked) {
            setPoints(points + 1);
        }
        
        setHaventClicked(false);

    };

    const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
    const getClassName = (index) => {
        if(index === answerIndex && index === answers.indexOf(correct)) return classes.rightAnswer
        else if (index === answerIndex ) return classes.incorrectAnswer 
        else return "";
    }

    return (
        <div className="question">
            <h1>{renderHTML(question)}</h1>
            <ul>
                {answers.map((item, index) => {
                    return <li className={getClassName(index)} 
                            onClick={(e) => onClickHandler(e.target.outerText, index)} key={index} >{renderHTML(item)}</li>
                })}
            </ul>
            <div className="points">{points}</div>
        </div>
    );
};

export default Question;