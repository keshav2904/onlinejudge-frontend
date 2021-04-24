import React from "react";
import ReactDOM from "react-dom";
import "../index.css";
import TeacherDash from "./teacherdash";

class AddQuestion extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        question: "",
        inputtestcase: "",
        outputtestcase: "",
      };
    }
  
    handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
    }
  
    handleSubmit = (event) => {
      var batch = {
        name: this.state.name,
        studentslist: this.state.studentslist.split(" "),
      }
      console.log(batch);
      fetch("http://localhost:8080/addbatch", {
        method: "POST",
        headers: {'Content-Type': 'application/json', 'Token': "'"+this.props.token+"'"}, 
        body: JSON.stringify(batch),
      }).then(function (response) {
        return response.json();
      }).then(function(json) {
        
        ReactDOM.render(TeacherDash, document.getElementById("root"));
      });
  
      event.preventDefault();
    };

    render() {
      return (
        <div>
        <h3>Add a new Question</h3>
        <form onSubmit = {this.handleSubmit}>
          <label for="name"><b>Enter Question Name:</b></label>
          <br />
          <input
          className="width-100"
          name="name"
          value={this.state.name}
          onChange={this.handleChange.bind(this)}
          placeholder="Enter Question Name">
          </input>
          <br />
          <label for="question"><b>Question : </b></label>
          <br />
          <textarea
            class="width-100"
            name="question"
            cols="40"
            rows="10"
            id="codebox"
            value={this.state.studentslist}
            onChange={this.handleChange.bind(this)}
            placeholder="Question goes here..."
          />
          <br />
          <label for="testcase"><b>Testcases : </b></label>
          <br />
          <div className="row">
              <div className="col">
          <textarea
            class="width-100"
            name="inputtestcase"
            cols="20"
            rows="10"
            id="codebox"
            value={this.state.studentslist}
            onChange={this.handleChange.bind(this)}
            placeholder="Input test case goes here..."
          /></div>
          <div className="col">
          <textarea
            class="width-100"
            name="outputtestcase"
            cols="20"
            rows="10"
            id="codebox"
            value={this.state.studentslist}
            onChange={this.handleChange.bind(this)}
            placeholder="Output test case goes here..."
          /></div>
          </div>
          <br />
          <input type="submit" value="Submit" />
          <br />
        </form>
        </div>
      );
    }
  }

export default AddQuestion;