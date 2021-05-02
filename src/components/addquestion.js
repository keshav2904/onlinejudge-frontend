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
        testcases: {
          input: "",
          output: ""
        }
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
    handleChange2(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState(prevState => ({
        testcases: {...prevState.testcases, [name]: value}
      }));
    }
  
    handleSubmit = (event) => {
      const token = this.props.token;
      var assignment = {
        name: this.state.name,
        question: this.state.question,
        testcases: [{
          input: this.state.testcases.input,
          output: this.state.testcases.output
        }]
      }
      console.log(assignment);
      fetch("http://localhost:8080/addassignment/"+this.props.id, {
        method: "POST",
        headers: new Headers({'Content-Type': 'application/json', 'Token': this.props.token}), 
        body: JSON.stringify(assignment),
      }).then(function (response) {
        if (response.ok) {ReactDOM.render(<TeacherDash token={token}/>, document.getElementById("root"));}
        else {ReactDOM.render("error adding question", document.getElementById("root"));}
      });
  
      event.preventDefault();
    };

    handleBack = () => {
      ReactDOM.render(
        <TeacherDash token={this.props.token} />,
        document.getElementById("root")
      );
    }
    
    render() {
      return (
        <div>
          <div id="back">
        <button onClick={this.handleBack}>go back</button>
        </div>
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
            name="input"
            cols="20"
            rows="10"
            id="codebox"
            value={this.state.studentslist}
            onChange={this.handleChange2.bind(this)}
            placeholder="Input test case goes here..."
          /></div>
          <div className="col">
          <textarea
            class="width-100"
            name="output"
            cols="20"
            rows="10"
            id="codebox"
            value={this.state.studentslist}
            onChange={this.handleChange2.bind(this)}
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