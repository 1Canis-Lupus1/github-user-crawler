import React, { Component } from "react";

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      parameter: "",
      userNotFound: false,
      userAfterSearch: false,
      displayName: "",
      displayID: "",
      displayPic: "",
      displayRepoCount: 0,
    };
  }

  async componentDidMount() {
    // console.log("Search the Github API with ",this.state.parameter)
    if (this.state.parameter) {
      this.setState({
        isLoading: true,
      });
      let userData = await fetch(
        `https://api.github.com/users/${this.state.parameter
          .toLowerCase()
          .trim()}`
      );
      let displayData = await userData.json();
      if (displayData.message === "Not Found") {
        this.setState({
          isLoading: false,
          userNotFound: true,
          userAfterSearch: false,
        });
      } else {
        console.log("Data is now:", displayData);
        this.setState({
          isLoading: false,
          userNotFound: false,
          userAfterSearch: true,
          displayName: displayData.name,
          displayID: displayData.id,
          displayPic: displayData.avatar_url,
          displayRepoCount: displayData.public_repos,
        });
      }
    } else {
      this.setState({
        userNotFound: false,
        userAfterSearch: false,
      });
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.parameter}
          placeholder="Enter Github Username Here"
          style={{ margin: "10px 40px", width: "500px", padding: "10px" }}
          onChange={(e) => {
            this.setState(
              {
                parameter: e.target.value,
              },
              () => {
                this.componentDidMount();
              }
            );
          }}
        />
        <br />
        {this.state.isLoading && (
          <div class="spinner-grow" role="status">
            <span class="visually-hidden"></span>
          </div>
        )}
        {!this.state.isLoading &&
          !this.state.parameter &&
          !this.state.userNotFound &&
          !this.state.userAfterSearch && (
            <div
              class="card text-white bg-dark mb-3"
              style={{ margin: "10px 100px" }}
            >
              <div class="card-header">
                <strong>Welcome To Github User Search</strong>
              </div>
              <div class="card-body">
                <h5
                  class="card-title badge bg-warning"
                  style={{ fontSize: "20px", color: "black" }}
                >
                  How To Use
                </h5>
                <div class="card border-success mb-3">
                  <div class="card-body text-success">
                    <h5 class="card-title">
                      Start typing in the <strong>"Search Bar"</strong> to get
                      the Github User Information,{" "}
                      <strong>One At A Time</strong>.<br />
                      Press{" "}
                      <strong>
                        <u>Enter key</u>
                      </strong>{" "}
                      for adding the current user to your{" "}
                      <strong>Display Table</strong>.
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          )}
        {!this.state.isLoading && this.state.userNotFound && (
          <>
            <div
              class="card border-danger mb-3"
              style={{ margin: "10px 200px" }}
            >
              <div
                class="card-header badge bg-danger"
                style={{ fontSize: "20px", color: "whitesmoke" }}
              >
                User Not Found
              </div>
              <div class="card-body text-danger">
                <h5 class="card-title">
                  Check if you have spelled the name correctly
                </h5>
              </div>
            </div>
          </>
        )}
        {!this.state.isLoading && this.state.userAfterSearch && (
          <>
            <img
              src={this.state.displayPic}
              style={{ margin: "5px" }}
              className="rounded"
              alt={this.state.displayName}
            />
            Name: {this.state.displayName?this.state.displayName:<strong>N/A</strong>}
            Id: {this.state.displayID}
          </>
        )}
      </div>
    );
  }
}

export default SearchBar;
