import React from "react";
import ReactDOM from "react-dom";
import QuestionList from "./questionlist";

class StudentDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Batches: [{name:"Problem Solving", id:1}, {name:"DSA", id:2}, {name:"OSSD", id:3}],
    };
  }

  // fetchBatches = () => {

  // }

  openBatch = (subj) => {
    ReactDOM.render(<QuestionList token={this.props.token} subject={subj}/>, document.getElementById("root"));
    }

  Batch = ({name}) => (
    <div>
        <button type="button" className="list-group-item list-group-item-action mb-3" onClick={() => {this.openBatch(name)}}>{name}</button>
    </div>
);

  render() {
    return (
        <div>
            <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 class="display-4 fw-normal">Student Dashboard</h1>
            </div>
            <div class="list-group">
                {this.state.Batches.map((batch) => (
                    <this.Batch
                        name={batch.name}
                        key={batch.id.value}
                    />
                ))}
            </div>
        </div>
    );
  }
}

export default StudentDash;
