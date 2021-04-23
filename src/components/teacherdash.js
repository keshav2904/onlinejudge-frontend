import React from "react";
import ReactDOM from "react-dom";
import AddBatch from "./addbatch";

class TeacherDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      accounttype: "",
    };
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleBatch = () => {
    ReactDOM.render(<AddBatch />, document.getElementById("root"));
  }

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
            <h1 class="display-4 fw-normal">Teacher Dashboard</h1>
            </div>
            <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
                <div class="col">
                <div class="card mb-4 rounded-3 shadow-sm">
                    <div class="card-header py-3">
                    <h4 class="my-0 fw-normal">Add Batch</h4>
                    </div>
                    <div class="card-body">
                    <ul class="list-unstyled mt-3 mb-4">
                        <li>Create a new Batch</li>
                    </ul>
                    <button type="button" class="w-100 btn btn-lg btn-outline-primary" onClick={this.handleBatch}>Add Batch</button>
                    </div>
                </div>
                </div>
                <div class="col">
                <div class="card mb-4 rounded-3 shadow-sm">
                    <div class="card-header py-3">
                    <h4 class="my-0 fw-normal">Add Question</h4>
                    </div>
                    <div class="card-body">
                    <ul class="list-unstyled mt-3 mb-4">
                        <li>Create a new Question</li>
                    </ul>
                    <button type="button" class="w-100 btn btn-lg btn-outline-primary">Add Question</button>
                    </div>
                </div>
                </div>
                <div class="col">
                <div class="card mb-4 rounded-3 shadow-sm ">
                    <div class="card-header py-3 ">
                    <h4 class="my-0 fw-normal">View Assignments</h4>
                    </div>
                    <div class="card-body">
                    <ul class="list-unstyled mt-3 mb-4">
                        <li>View your Assignments</li>
                    </ul>
                    <button type="button" class="w-100 btn btn-lg btn-outline-primary">Click here</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
  }
}

export default TeacherDash;
