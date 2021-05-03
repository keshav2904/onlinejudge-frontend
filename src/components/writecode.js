import React from "react";
import ReactDOM from "react-dom";
import "../index.css";
import Output from "./output";
import SelectBatch from "./selectbatch";
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
      const token = this.props.token;
      console.log(token);
      console.log(JSON.stringify(this.state));
      fetch("http://localhost:8080/submit/"+this.props.id, {
        method: "POST",
        headers: new Headers({'Content-Type': 'application/json', "Token": token}), 
        body: JSON.stringify(this.state),
      }).then(function (response) {
        return response.json();
      }).then(function(json) {
        console.log(json.result[0].output);
        ReactDOM.render(Output(nl2br(json.result[0].output)), document.getElementById("output-div"));
        if (json.result[0].result){ReactDOM.render("RESULT : Pass", document.getElementById("result"));}
        else {ReactDOM.render("RESULT : Fail", document.getElementById("result"));}
      });
  
      event.preventDefault();
    };

    handleBack = () => {
      const token = this.props.token;
          fetch("http://localhost:8080/getbatch", {
            method: "GET",
            headers: new Headers({ Token: token }),
          })
            .then(function (response) {
              if (response.ok) {
                return response.json();
              } else if (response.status === 401) {
                return "token is expired! please Re-login";
              }
            })
            .then(function (json) {
              if (typeof json === "string") {
                ReactDOM.render(json, document.getElementById("root"));
              } else if (json === null) {
                ReactDOM.render(
                  "No batches Found",
                  document.getElementById("root")
                );
              } else {
                console.log(json);
                ReactDOM.render(
                  <SelectBatch token={token} Batches={json} query={3} />,
                  document.getElementById("root")
                );
              }
            })
            .catch((error) => {
              console.log(error);
            });
    }

    render() {
      return (
        <div>
          <div id="back">
        <button onClick={this.handleBack}>go back</button>
        </div>
        <div id="question-div">
            {Question(this.props.question)}
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
        <div className="row">
        <div id="output-div" className="col">
        </div>
        <div id="exp-out" className="col">
        </div>
        </div>
        <p id="result"></p>
        </div>
      );
    }
  }

export default WriteCode;