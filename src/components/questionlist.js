import React from "react";
import ReactDOM from "react-dom";
import WriteCode from "./writecode";

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Questions: [{name:"Fibonacci", id:1}],
    };
  }

  openQuestion = (token) => {
    ReactDOM.render(<WriteCode token={token}/>, document.getElementById("root"));
    }

  Question = ({name}) => (
    <div>
        <button type="button" class="list-group-item list-group-item-action" onClick={this.openQuestion}>{name}</button>
    </div>
);

//   handleSubmit = (event) => {
//     var accounttype = this.state.accounttype;
//     fetch("http://localhost:8080/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(this.state),
//     })
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (json) {
//         var token = json.token;
//         if (accounttype === "student"){
//           ReactDOM.render(<StudentDash token={{ token }}/>, document.getElementById("root"));
//         }
//         else{
//           ReactDOM.render(<TeacherDash token={{ token }}/>, document.getElementById("root"));
//         }
//       });

//     event.preventDefault();
//   };

  render() {
    return (
        <div>
            <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 class="display-4 fw-normal">Dashboard</h1>
            </div>
            <div class="list-group">
                {this.state.Questions.map((question) => (
                    <this.Question
                        name={question.name}
                        key={question.id.value}
                    />
                ))}
            </div>
        </div>
    );
  }
}

export default QuestionList;
