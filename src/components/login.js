import React from "react";
import ReactDOM from "react-dom";
import Register from "./register";
// import StudentDash from "./studentdash";
import TeacherDash from "./teacherdash";
import SelectBatch from "./selectbatch";

class Login extends React.Component {
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

  // fetchBatch = (token) => {
  //   fetch("http://localhost:8080/getbatch", {
  //       method: "GET",
  //       headers: new Headers({'Token': token})
  //     }).then(function (response) {
  //       if (response.ok) {return response.json();}
  //       else if (response.status === 401) {return "token is expired! please Re-login";}
  //     }).then(function(json) {
  //       if (typeof json === "string") {
  //         ReactDOM.render(json, document.getElementById("root"));
  //       }
  //       else if(json === null){
  //         ReactDOM.render("No batches Found", document.getElementById("root"));
  //       }
  //       else {
  //       ReactDOM.render(<SelectBatch token={token} Batches={json} query={3}/>, document.getElementById("root"));
  //     }
  //     }).catch((error) => {
  //       console.log(error);
  //     });
  // }

  handleSubmit = (event) => {
    var accounttype = this.state.accounttype;
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    })
      .then(function (response) {
        if (response.ok){return response.json();}
        else {return {}}
      })
      .then(function (json) {
        if (Object.keys(json).length === 0) {
          ReactDOM.render("Error Login", document.getElementById("root"));
        }
        console.log(json.token);



        if (accounttype === "student") {
          const token = json.token;
          fetch("http://localhost:8080/getbatch", {
            method: "GET",
            headers: new Headers({ Token: json.token }),
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
        } else {
          ReactDOM.render(
            <TeacherDash token={json.token} />,
            document.getElementById("root")
          );
        }
      });

    event.preventDefault();
  };

  handleRegister = () => {
    ReactDOM.render(<Register />, document.getElementById("root"));
  };

  render() {
    return (
      <div className="text-center mt-5">
        <form
          style={{ maxWidth: "50%", margin: "auto" }}
          onSubmit={this.handleSubmit}
        >
          <img
            className="mt-5 mb-5"
            src="jiit_logo.png"
            alt="jiit logo"
            height="128"
          ></img>
          <h1 className="h3 mb-4 font-weight-normal">LOGIN</h1>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            required
            autoFocus
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
            <button className="btn btn-lg btn-primary" type="submit">
              Login
            </button>
          </div>
        </form>
        <label className="mr-5">Don't have an Account ?</label>
        <button
          className="border-0 btn-outline-dark"
          onClick={this.handleRegister}
        >
          Register
        </button>
      </div>
    );
  }
}

export default Login;
