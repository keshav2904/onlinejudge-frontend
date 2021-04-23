import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Login from "./components/login";
import Register from "./components/register";
import StudentDash from "./components/studentdash";
import TeacherDash from "./components/teacherdash";
// import WriteCode from "./components/writecode";
// import * as indentation from 'indent-textarea';

ReactDOM.render(<StudentDash />, document.getElementById("root"));
// ReactDOM.render(<WriteCode />, document.getElementById("root"));
// const textarea = document.querySelector('textarea');
// indentation.watch(textarea);
