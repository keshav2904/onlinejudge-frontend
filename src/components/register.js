import React from "react";
import ReactDOM from "react-dom";
import Login from "./login";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
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

  handleSubmit = (event) => {
    fetch("http://localhost:8080/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    })
      .then(function (response) {
        if(response.ok) {return response.json();}
        else if(response.status === 400) {console.log(response.body); return {};}
      })
      .then(function (json) {
        if (Object.keys(json).length === 0) {
          ReactDOM.render("Error Register", document.getElementById("root"));
        }
        else{
        ReactDOM.render(<Login />, document.getElementById("root"));
        }
      });

    event.preventDefault();
  };

  render() {
    return (
      <div className="text-center mt-5">
        <form style={{ "maxWidth": "50%", margin: "auto" }} onSubmit={this.handleSubmit}>
          <img
            className="mt-5 mb-5"
            src="jiit_logo.png"
            alt="jiit logo"
            height="128"
          ></img>
          <h1 className="h3 mb-4 font-weight-normal">REGISTER</h1>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Name"
            required
            autoFocus
            value={this.state.name}
            onChange={this.handleChange.bind(this)}
          />
          <input
            type="email"
            name="email"
            className="form-control mt-3"
            placeholder="Email"
            required
            value={this.state.email}
            onChange={this.handleChange.bind(this)}
          />
          <input
            type="password"
            name="password"
            className="form-control mt-3"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange.bind(this)}
          />
          <select
            className="mt-3 mb-3"
            name="accounttype"
            required
            value={this.state.type}
            onChange={this.handleChange.bind(this)}
          >
            <option value="">--Please choose account type--</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
          <div className="mt-4 mb-5">
            <button className="btn btn-lg btn-dark" type="submit">Register</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
