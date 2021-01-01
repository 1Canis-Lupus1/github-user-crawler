import React, { Component } from "react";

export class Copyright extends Component {
  render() {
    return (
      <div>
        <b>
          Made With{" "}
          <i className="fa fa-spin">
            <i
              className="fa fa-heart"
              style={{ color: "red", fontSize: "20px" }}
            ></i>
          </i>{" "}
          In <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4FeFJWc3Vv6BE2hDaz6OnCdhs1_5mwLa8og&usqp=CAU" alt="INDIA" height="60px" width="80px" />
        </b>
        <br />
        <p style={{ marginTop: "20px" }}>
          <b>
            <i className="fa fa-copyright"></i>
          </b>{" "}
          No Copyright
        </p>
        <small className="badge bg-dark text-light">
          Created and Maintained By{" "}
          <a href="https://github.com/1Canis-Lupus1" target="_blank"><b style={{ fontSize: "15px",color:"orangered" }}>Shubham Choudhary</b>.</a><br />
          Feel Free to copy. In Case any help is required, connect with me on
          &nbsp;
          <a
            href="https://www.linkedin.com/in/shubham-choudhary-8457a9141/"
            target="_blank"
            style={{
              fontSize: "20px",
              border: "1px solid blue",
              padding: "0px 3px",
            }}
          >
            <i className="fa fa-linkedin"></i>
          </a>
        </small>
      </div>
    );
  }
}

export default Copyright;
