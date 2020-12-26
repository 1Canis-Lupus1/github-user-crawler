import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";

export class DisplayTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      getRepoByName: "",
      RepoList: [],
    };
  }

  async componentDidMount() {
    var userArr = JSON.parse(localStorage.getItem("users"));
    console.log("Check 1:", userArr);
    if (userArr === null) {
      this.setState({
        userList: [],
      });
    } else {
      this.setState({
        userList: userArr,
      });
    }
    if (this.state.getRepoByName) {
      console.log("In Get Repo By Name", this.state.getRepoByName);
      let userRepo = await fetch(
        `https://api.github.com/users/${
          this.state.getRepoByName.split(" ")[0]
        }/repos`
      );
      let displayRepo = await userRepo.json();
      this.setState(
        {
          RepoList: displayRepo,
        },
        () => {
          console.log("After Set State:", this.state.RepoList);
        }
      );
    }
  }

  handleDelete = (id) => {
    console.log("Deleting by ID:", id);
    //Remove From LocalStorage Here
    let items = JSON.parse(localStorage.getItem("users"));
    let newItems = items.filter((item) => {
      var newArr = [];
      if (item.id != id) {
        console.log("In Statemennt:", item.id);
        newArr.push(item);
        return newArr;
      }
    });
    localStorage.setItem("users", JSON.stringify(newItems));
    window.location.reload();
  };

  render() {
    return (
      <div style={{ margin: "80px" }}>
        <h2 class="alert alert-info">My User List</h2>
        {this.state.userList.length === 0 ? (
          <div class="card border-danger mb-3">
            <div class="card-header">
              <h5>
                <strong>No User To Display</strong>
              </h5>
            </div>
            <div class="card-body text-danger">
              <p class="card-text">
                Start searching for Users and Click on{" "}
                <strong>Add To List</strong> to display here
              </p>
            </div>
          </div>
        ) : (
          this.state.userList.map((each) => {
            console.log("Each is:", each);
            return (
              <>
                <div class="row">
                  <div class="col">
                    <div class="card h-100">
                      <img
                        src={each.pic}
                        class="card-img-top"
                        alt="..."
                        style={{
                          height: "200px",
                          width: "200px",
                          margin: "40px",
                          border: "3px solid blue",
                        }}
                      />
                      <div class="card-body">
                        <h5 class="card-title" style={{ fontSize: "30px" }}>
                          {each.name ? (
                            <strong>{each.name}</strong>
                          ) : (
                            <b>No Name Specified</b>
                          )}
                          <br />
                          <span
                            class="badge bg-dark text-light"
                            style={{ fontSize: "20px" }}
                          >
                            Followers
                          </span>{" "}
                          :{" "}
                          {each.followers ? (
                            <strong>{each.followers}</strong>
                          ) : (
                            <strong>N/A</strong>
                          )}
                          <br />
                          <span
                            class="badge bg-dark text-light"
                            style={{ fontSize: "20px" }}
                          >
                            Following
                          </span>{" "}
                          :{" "}
                          {each.following ? (
                            <strong>{each.following}</strong>
                          ) : (
                            <strong>N/A</strong>
                          )}
                        </h5>
                        <p class="card-text">
                          {each.name ? (
                            <button
                              value={each.name}
                              class="btn btn-success"
                              onClick={(e) => {
                                console.log("Viewing", e.target.value);
                                this.setState(
                                  {
                                    getRepoByName: e.target.value,
                                  },
                                  () => {
                                    this.componentDidMount();
                                  }
                                );
                              }}
                            >
                              View Repositories
                            </button>
                          ) : (
                            <button
                              value={each.name}
                              class="btn btn-success"
                              onClick={(e) => {
                                console.log("Viewing", e.target.value);
                                this.setState(
                                  {
                                    getRepoByName: e.target.value,
                                  },
                                  () => {
                                    this.componentDidMount();
                                  }
                                );
                              }}
                              disabled
                            >
                              View Repositories
                            </button>
                          )}
                        </p>
                        {this.state.getRepoByName === each.name && (
                          <ul style={{ listStyle: "none" }}>
                            {this.state.RepoList.map((e, i) => {
                              return (
                                <>
                                  <div
                                    class="list-group"
                                    style={{ margin: "20px" }}
                                  >
                                    <a
                                      href={e.html_url}
                                      target="_blank"
                                      class="list-group-item list-group-item-action flex-column align-items-start "
                                    >
                                      <div class="d-flex w-100 justify-content-between">
                                        <h5 class="mb-1">
                                          <span
                                            class="badge bg-warning"
                                            style={{ fontSize: "20px" }}
                                          >
                                            Repository Name:
                                          </span>
                                          &nbsp;<strong>{e.name}</strong>
                                        </h5>
                                        <small>
                                          <strong>Id:</strong>&nbsp;{e.id}
                                        </small>
                                      </div>
                                      <hr />
                                      <p class="mb-1">
                                        <span class="alert alert-dark">
                                          <span>Language:</span>
                                          <strong>
                                            &nbsp;
                                            {e.language
                                              ? e.language
                                              : "Not Defined"}
                                          </strong>
                                        </span>
                                        <br />
                                      </p>
                                      <hr />
                                      <small style={{ margin: "10px" }}>
                                        Updated At:&nbsp;
                                        {moment(each.created_at).format(
                                          "dddd, MMMM Do YYYY, h:mm:ss a"
                                        )}
                                      </small>
                                    </a>
                                  </div>
                                </>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                      <div class="card-footer">
                        <button
                          class="btn btn-outline-danger"
                          type="button"
                          value={each.id}
                          onClick={(each) => {
                            this.handleDelete(each.target.value);
                            toast.error("User Removed From List");
                          }}
                        >
                          Delete From List
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
                  </div>
                </div>
                <hr />
              </>
            );
          })
        )}
      </div>
    );
  }
}

export default DisplayTable;
