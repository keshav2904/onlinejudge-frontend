import React from "react";
import ReactDOM from "react-dom";
import "../index.css";
import TeacherDash from "./teacherdash";

class AddBatch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        studentslist: "",
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
      fetch("http://localhost:8080/addbatch", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(this.state),
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
        <h3>Add a new Batch</h3>
        <form onSubmit ={this.handleSubmit}>
          <label for="name"><b>Enter the Subject:</b></label>
          <br />
          <input
          className="width-100"
          name="name"
          value={this.state.name}
          onChange={this.handleChange.bind(this)}
          placeholder="Enter Subject Name">
          </input>
          <br />
          <label for="studentslist"><b>Students mails here : </b></label>
          <br />
          <textarea
            class="width-100"
            name="studentslist"
            cols="40"
            rows="20"
            id="codebox"
            value={this.state.studentslist}
            onChange={this.handleChange.bind(this)}
            placeholder="Students mail list goes here..."
          />
          <br />
          <input type="submit" value="Submit" />
          <br />
        </form>
        </div>
      );
    }
  }

export default AddBatch;