import React from 'react';

import './question.css'

const Question = (props) => {

    const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

    return (
        <div className="question">
            <h1>{renderHTML(props.question)}</h1>
            <ul>
                <li>{renderHTML(props.correct)}</li>
                {props.incorrect.map(item => {
                    return <li>{renderHTML(item)}</li>
                })}
            </ul>
        </div>
    );
};

export default Question;