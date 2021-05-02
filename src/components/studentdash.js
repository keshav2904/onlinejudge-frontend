import React from "react";
import ReactDOM from "react-dom";
import QuestionList from "./questionlist";

class StudentDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Batches: [],
    };
  }
  

  openBatch = (subid) => {
    ReactDOM.render(<QuestionList token={this.props.token} id={subid}/>, document.getElementById("root"));
    }

  Batch = ({name, id}) => (
    <div>
        <button type="button" className="list-group-item list-group-item-action mb-3" onClick={() => {this.openBatch(id)}}>{name}</button>
    </div>
);

  render() {
    this.fetchBatches();
    return (
        <div>
            <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 class="display-4 fw-normal">Student Dashboard</h1>
            </div>
            <div class="list-group">
                {this.state.Batches.map((batch) => (
                    <this.Batch
                        name={batch.name}
                        id={batch.id}
                        key={batch.id.value}
                    />
                ))}
            </div>
        </div>
    );
  }
}

export default StudentDash;
