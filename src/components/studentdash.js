import React from "react";
import ReactDOM from "react-dom";
import QuestionList from "./questionlist";

class StudentDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Batches: [{name:"Problem Solving", id:1}, {name:"DSA", id:2}],
    };
  }

  openBatch = () => {
    ReactDOM.render(<QuestionList token={this.props.token}/>, document.getElementById("root"));
    }

  Batch = ({name}) => (
    <div>
        <button type="button" class="list-group-item list-group-item-action" onClick={this.openBatch}>{name}</button>
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
