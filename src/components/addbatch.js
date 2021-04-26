import React from "react";
import ReactDOM from "react-dom";
import "../index.css";
import TeacherDash from "./teacherdash";

class AddBatch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        students: "",
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
      const token = this.props.token;
      var batch = {
        name: this.state.name,
        students: this.state.students.split(" "),
      }
      fetch("http://localhost:8080/addbatch", {
        method: "POST",
        headers: new Headers({'Content-Type': 'application/json', 'Token': token}), 
        body: JSON.stringify(batch),
      }).then(function (response) {
        if (response.ok) {ReactDOM.render(<TeacherDash token={token}/>, document.getElementById("root"));}
        else {ReactDOM.render("Error creating batch", document.getElementById("root"));}
      });
      event.preventDefault();
    };

    render() {
      return (
        <div>
        <h3>Add a new Batch</h3>
        <form onSubmit = {this.handleSubmit}>
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
          <label for="students"><b>Students mails here : </b></label>
          <br />
          <textarea
            class="width-100"
            name="students"
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