import React from "react";
import ReactDOM from "react-dom";
import AddBatch from "./addbatch";
import SelectBatch from "./selectbatch";

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
    console.log(this.props.token);
    ReactDOM.render(<AddBatch token={this.props.token}/>, document.getElementById("root"));
  }

  handleQuestion = () => {
    const token = this.props.token;
    console.log(token);
    // ReactDOM.render(<ViewBatch token={this.props.token} Batches={[{name:"Problem Solving", id:1}, {name:"DSA", id:2}, {name:"OSSD", id:3}]}/>, document.getElementById("root"));
    fetch("http://localhost:8080/getbatch", {
        method: "GET",
        headers: new Headers({'Token': token})
      }).then(function (response) {
        if (response.ok) {return response.json();}
        else if (response.status === 401) {return "token is expired! please Re-login";}        
      }).then(function(json) {
        if (typeof json === "string") {
          ReactDOM.render(json, document.getElementById("root"));  
        }
        else if(json === null){
          ReactDOM.render("No batches Found", document.getElementById("root"));
        }
        else {
        ReactDOM.render(<SelectBatch token={token} Batches={json} query={1}/>, document.getElementById("root"));
      }
      }).catch((error) => {
        console.log(error);
      });
  }

  handleViewBatch = () => {
    const token = this.props.token;
    // ReactDOM.render(<ViewBatch token={this.props.token} Batches={[{name:"Problem Solving", id:1}, {name:"DSA", id:2}, {name:"OSSD", id:3}]}/>, document.getElementById("root"));
    fetch("http://localhost:8080/getbatch", {
        method: "GET",
        headers: new Headers({'Token': token})
      }).then(function (response) {
        if (response.ok) {return response.json();}
        else if (response.status === 401) {return "token is expired! please Re-login";}        
      }).then(function(json) {
        if (typeof json === "string") {
          ReactDOM.render(json, document.getElementById("root"));  
        }
        else if(json === null){
          ReactDOM.render("No batches Found", document.getElementById("root"));
        }
        else {
        ReactDOM.render(<SelectBatch token={token} Batches={json} query={2}/>, document.getElementById("root"));
      }
      }).catch((error) => {
        console.log(error);
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
