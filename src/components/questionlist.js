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
    ReactDOM.render(<WriteCode token={this.props.token} id={id}/>, document.getElementById("root"));
    }

  Question = ({name}, {id}) => (
    <div>
        <button type="button" class="list-group-item list-group-item-action mb-3" onClick={() => {this.openQuestion(id)}}>{name}</button>
    </div>
);

  render() {
    return (
        <div>
            <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 class="display-4 fw-normal">{this.props.subject}</h1>
            </div>
            <div class="list-group">
                {this.state.Questions.map((question) => (
                    <this.Question
                        name={question.name}
                        key={question.id}
                    />
                ))}
            </div>
        </div>
    );
  }
}

export default QuestionList;
