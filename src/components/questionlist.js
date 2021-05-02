import React from "react";
import ReactDOM from "react-dom";
import WriteCode from "./writecode";

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Questions: [{name:"Hello, World", id:1}, {name:"loop the loop", id:2}, {name:"Fibonacci", id:3}, {name:"Dynamic Programming", id:4}],
    };
  }

  // fetchQuestions = (this.props.subject) => {

  // }

  openQuestion = (id) => {
    const token = this.props.token
    fetch("http://localhost:8080/getassignment/"+id, {
            method: "GET",
            headers: new Headers({ Token: token }),
          })
            .then(function (response) {
              if (response.ok) {
                return response.json();
              } else if (response.status === 401) {
                return "token is expired! please Re-login";
              }
            })
            .then(function (json) {
              if (typeof json === "string") {
                ReactDOM.render(json, document.getElementById("root"));
              } else {
                console.log(json);
                ReactDOM.render(
                  <WriteCode token={token} id={id} question={json}/>,
                  document.getElementById("root")
                );
              }
            })
            .catch((error) => {
              console.log(error);
            });
    }

  Question = ({id}) => (
    <div>
        <button type="button" class="list-group-item list-group-item-action mb-3" onClick={() => {this.openQuestion(id)}}>{id}</button>
    </div>
);

  render() {
    if (this.props.Questions)
    {
    return (
        <div>
            <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 class="display-4 fw-normal">{this.props.subject}</h1>
            </div>
            <div class="list-group">
                {this.props.Questions.map((question) => (
                    <this.Question
                        id={question}
                        key={question}
                    />
                ))}
            </div>
        </div>
    );
    }
    else {
      return (
        <div>
          No Questions Found
        </div>
      )
    }
  }
}

export default QuestionList;
