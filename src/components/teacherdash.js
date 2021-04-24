import React from "react";
import ReactDOM from "react-dom";
import AddBatch from "./addbatch";
import AddQuestion from "./addquestion";
import ViewBatch from "./viewbatch";

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
    ReactDOM.render(<AddBatch token={this.props.token}/>, document.getElementById("root"));
  }

  handleQuestion = () => {
    ReactDOM.render(<AddQuestion token={this.props.token} />, document.getElementById("root"));
  }

  handleViewBatch = () => {
    // ReactDOM.render(<ViewBatch token={this.props.token} Batches={[{name:"Problem Solving", id:1}, {name:"DSA", id:2}, {name:"OSSD", id:3}]}/>, document.getElementById("root"));
    fetch("http://localhost:8080/getbatch", {
        method: "GET",
        mode: "no-cors",
        headers: {'Token': ''+this.props.token},
      }).then(function (response) {
        if(response.ok) {return response.json();}
        else {console.log(response.text()); return 0;}
      }).then(function(json) {
        if (Object.keys(json).length === 0) {
          ReactDOM.render("No Batches Found", document.getElementById("root"));
        }
        ReactDOM.render(<ViewBatch token={this.props.token} Batches={json}/>, document.getElementById("root"));
      });
  }

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
                    <button type="button" class="w-100 btn btn-lg btn-outline-primary" onClick={this.handleQuestion}>Add Question</button>
                    </div>
                </div>
                </div>
                <div class="col">
                <div class="card mb-4 rounded-3 shadow-sm ">
                    <div class="card-header py-3 ">
                    <h4 class="my-0 fw-normal">View Batches</h4>
                    </div>
                    <div class="card-body">
                    <ul class="list-unstyled mt-3 mb-4">
                        <li>View your Batches</li>
                    </ul>
                    <button type="button" class="w-100 btn btn-lg btn-outline-primary" onClick={this.handleViewBatch}>Click here</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
  }
}

export default TeacherDash;
