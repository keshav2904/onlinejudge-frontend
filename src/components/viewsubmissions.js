import React from "react";
import ReactDOM from "react-dom";
import TeacherDash from "./teacherdash";
import nl2br from "react-nl2br";

class ViewSubmissions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submissions: [],
    };
  }

  // fetchQuestions = (this.props.subject) => {

  // }

  openSubmission = (submission) => {
    var result = "Failed";
    if (submission.result[0].result) {result = "Passed";}
    ReactDOM.render(
      <div class="view-submission">
        <div id="back">
        <button onClick={() => {ReactDOM.render(<ViewSubmissions token={this.props.token} submissions={this.props.submissions} />, document.getElementById("root"))}}>go back</button>
        </div>
        <div>Language : <b>{submission.lang}</b></div><br></br>
        <b>Code:</b>
        <div>{nl2br(submission.code)}</div><br></br>
        <b>Input:</b>
        <div>{nl2br(submission.result[0].input)}</div><br></br>
        <b>Output:</b>
        <div>{nl2br(submission.result[0].output)}</div><br></br>
        <div>Result : <b>{result}</b></div>
      </div>,
      document.getElementById("root")
    )
  }

  Submission = ({submission, id, sname, result}) => {
    if (result) {return(
        <tr class="table-success">
        <td><button class="view-sub-button" onClick={() => {this.openSubmission(submission)}}>{id}</button></td>
        <td>{sname}</td>
        <td>Passed</td>
        </tr>
    )}else {return(
        <tr class="table-danger">
        <td><button class="view-sub-button" onClick={() => {this.openSubmission(submission)}}>{id}</button></td>
        <td>{sname}</td>
        <td>Failed</td>
        </tr>
    )}
};

handleBack = () => {
  const token = this.props.token;
  ReactDOM.render(
    <TeacherDash token={token} />,
    document.getElementById("root")
  );
}
  render() {
    if (this.props.submissions)
    {
    return (
        <div>
            <div id="back">
        <button onClick={this.handleBack}>go back</button>
        </div>
            <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 class="display-4 fw-normal">SUBMISSIONS</h1>
            </div>
            <table class="table">
                <thead>
                <tr class="table-primary">
                    <th>Submission ID</th>
                    <th>Student Name</th>
                    <th>Result</th>
                </tr>
                </thead>
                <tbody>
                {this.props.submissions.map((submission) => (
                    <this.Submission
                        submission={submission}
                        id={submission.id}
                        sname={submission.student.name}
                        result={submission.result[0].result}
                        key={submission.id}
                    />
                
                ))}
                </tbody>
            </table>
        </div>
    );
    }
    else {
      return (
        <div>
          <div id="back">
        <button onClick={this.handleBack}>go back</button>
        </div>
          No Submissions Found
        </div>
      )
    }
  }
}

export default ViewSubmissions;
