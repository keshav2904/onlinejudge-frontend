import React from "react";
import ReactDOM from "react-dom";
import "../index.css";
import Output from "./output";
import Question from "./question";

const nl2br = require('react-nl2br');

class WriteCode extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        lang: "",
        code: "",
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
      fetch("http://localhost:5050/compile", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(this.state),
      }).then(function (response) {
        return response.json();
      }).then(function(json) {
  
        ReactDOM.render(Output(nl2br(json.output)), document.getElementById("output-div"));
      });
  
      event.preventDefault();
    };

    render() {
      return (
        <div>
        <div id="question-div">
            {Question(this.props.id, this.props.token)}
        </div>
        <form onSubmit ={this.handleSubmit}>
          <label for="lang-select"><b>Choose a language:</b></label>
          <br />
          <select
            name="lang"
            required
            value={this.state.lang}
            onChange={this.handleChange.bind(this)}
          >
            <option value="">--Please choose a language--</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="py">Python</option>
          </select>
          <br />
          <label for="code"><b>CODE here : </b></label>
          <br />
          <textarea
            class="width-100"
            name="code"
            cols="40"
            rows="20"
            id="codebox"
            value={this.state.code}
            onChange={this.handleChange.bind(this)}
            placeholder="Write code here..."
          />
          <br />
          <input type="submit" value="Submit" />
          <br />
        </form>
        <div id="output-div">
        </div>
        </div>
      );
    }
  }

export default WriteCode;