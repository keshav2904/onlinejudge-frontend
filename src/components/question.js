import React from "react"
import nl2br from "react-nl2br";
// function fetchQuestion() {

// }

function Question(question) {
    return (
      <div>
        <h3>QUESTION : {question.name}</h3>
        <p class="fs-5" id="question-body">{nl2br(question.question)}</p>
      </div>
    );
  }

export default Question;