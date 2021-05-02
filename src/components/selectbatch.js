import React from "react";
import ReactDOM from "react-dom";
import AddQuestion from "./addquestion";
import QuestionList from "./questionlist";

// {name:"Hello, World", id:1}, {name:"loop the loop", id:2}, {name:"Fibonacci", id:3}, {name:"Dynamic Programming", id:4}

class SelectBatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Batches: [],
    };
  }


  openQuestion = (name, id, questions) => {
      console.log(id);
      if (this.props.query === 1){
        ReactDOM.render(<AddQuestion token={this.props.token} id={id}/>, document.getElementById("root"));
      }
      else if (this.props.query === 2){
        ReactDOM.render(<QuestionList token={this.props.token} Questions={questions} />, document.getElementById("root"));
    } else {
      console.log(questions);
      ReactDOM.render(<QuestionList token={this.props.token} Questions={questions} />, document.getElementById("root"));
    }}

  Batch = ({name, id, questions}) => (
    <div>
        <button type="button" class="list-group-item list-group-item-action mb-3" onClick={() => {this.openQuestion(name, id, questions)}}>{name}</button>
    </div>
);

  render() {
    return (
        <div>
            <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 class="display-4 fw-normal">Your Batches</h1>
            </div>
            <div class="list-group">
                {this.props.Batches.map((batch) => (
                    <this.Batch
                        name={batch.name}
                        id={batch.id}
                        questions={batch.assignments}
                        key={batch.id}
                    />
                ))}
            </div>
        </div>
    );
  }
}

export default SelectBatch;
