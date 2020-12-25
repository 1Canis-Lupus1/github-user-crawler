import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
// import { ToastsContainer, ToastsStore } from "react-toasts";

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
      displayFollowers: 0,
      displayFollowing: 0,
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
          displayFollowers: displayData.followers,
          displayFollowing: displayData.following,
        });
      }
    } else {
      this.setState({
        userNotFound: false,
        userAfterSearch: false,
      });
    }
  }

  handleAdd = () => {
    const { displayID, displayName } = this.state;
    console.log(
      "Adding Values to localstorage with key:",
      displayID,
      displayName
    );
    // ToastsStore.success("User Added To Display List")
    // localStorage.setItem(`${displayID}`,`${displayName}`)
  };

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
                      Click on{" "}
                      <strong>
                        <u>Add To List</u>
                      </strong>{" "}
                      button for adding the current user to your{" "}
                      <strong>Display Table</strong> and view their{" "}
                      <strong>First 5 Github Repositories</strong>.
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
            <div class="card mb-3" style={{ margin: "10px 100px" }}>
              <div class="row g-0">
                <div class="col-md-4">
                  <img
                    src={this.state.displayPic}
                    alt={this.state.displayName}
                    style={{
                      height: "250px",
                      border: "2px dotted black",
                      margin: "50px",
                    }}
                  />
                  <p class="card-text" style={{ margin: "0px" }}>
                    <small class="text-muted">
                      <u>
                        Last updated {Math.floor(Math.random() * 3) + 1} mins
                        ago
                      </u>
                    </small>
                  </p>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">
                      <span
                        class="badge bg-dark"
                        style={{ color: "whitesmoke", padding: "5px" }}
                      >
                        Name :
                      </span>
                      {this.state.displayName ? (
                        <strong style={{ fontSize: "25px" }}>
                          &nbsp;{this.state.displayName}
                        </strong>
                      ) : (
                        <strong>&nbsp;N/A</strong>
                      )}
                    </h5>

                    <p class="card-text">
                      <ul style={{ listStyle: "none" }}>
                        <li class="alert alert-primary">
                          <span
                            class="badge bg-light text-dark"
                            style={{ fontSize: "20px", marginLeft: "0px" }}
                          >
                            User Id
                          </span>{" "}
                          :{" "}
                          {this.state.displayID ? (
                            <strong>{this.state.displayID}</strong>
                          ) : (
                            <strong>N/A</strong>
                          )}
                        </li>
                        <li class="alert alert-success">
                          <span
                            class="badge bg-light text-dark"
                            style={{ fontSize: "20px" }}
                          >
                            Followers
                          </span>{" "}
                          :{" "}
                          {this.state.displayFollowers ? (
                            <strong>{this.state.displayFollowers}</strong>
                          ) : (
                            <strong>N/A</strong>
                          )}
                        </li>
                        <li class="alert alert-warning">
                          <span
                            class="badge bg-light text-dark"
                            style={{ fontSize: "20px" }}
                          >
                            Following
                          </span>{" "}
                          :{" "}
                          {this.state.displayFollowing ? (
                            <strong>{this.state.displayFollowing}</strong>
                          ) : (
                            <strong>N/A</strong>
                          )}
                        </li>
                        <li class="alert alert-info">
                          <span
                            class="badge bg-light text-dark"
                            style={{ fontSize: "20px" }}
                          >
                            Repositories
                          </span>{" "}
                          :{" "}
                          {this.state.displayRepoCount ? (
                            <strong>{this.state.displayRepoCount}</strong>
                          ) : (
                            <strong>NULL</strong>
                          )}
                        </li>
                        <div class="d-grid gap-2 col-6 mx-auto">
                          <div>
                            <button
                              class="btn btn-outline-success"
                              onClick={() => {
                                toast.success("User Added To List");
                                this.handleAdd();
                              }}
                              type="button"
                            >
                              Add To List
                            </button>
                            <ToastContainer
                              position="bottom-center"
                              autoClose={5000}
                              hideProgressBar={false}
                              newestOnTop={false}
                              closeOnClick
                              rtl={false}
                              pauseOnFocusLoss
                              draggable
                              pauseOnHover
                            />
                          </div>
                        </div>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default SearchBar;
