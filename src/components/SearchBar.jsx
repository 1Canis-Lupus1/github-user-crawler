import React, { Component } from "react";

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      parameter: "",
      userNotFound: false,
      userAfterSearch: false,
    };
  }

  async componentDidMount() {
    // console.log("Search the Github API with ",this.state.parameter)
    if (this.state.parameter) {
      this.setState({
        isLoading: true,
      });
      let userData = await fetch(
        `https://api.github.com/users/${this.state.parameter}`
      );
      let displayData = await userData.json();
      if (displayData.message === "Not Found") {
        // console.log("User Not Found");
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
        });
      }
    }
    else{
        this.setState({
            userNotFound:false,
            userAfterSearch:false
        })
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.parameter}
          placeholder="Enter Github Username Here"
          style={{margin:"10px"}}
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
        /><br/>
        {this.state.isLoading && (
          <div class="spinner-grow" role="status">
            <span class="visually-hidden"></span>
          </div>
        )}
        {!this.state.isLoading && !this.state.parameter && !this.state.userNotFound && !this.state.userAfterSearch && (
          <div
            class="card text-white bg-success mb-3"
            style={{ margin: "10px 40px" }}
          >
            <div class="card-header">Welcome To Github User Search</div>
            <div class="card-body">
              <h5 class="card-title">How To Use</h5>
              <p class="card-text">
                Start Typing in the search bar to get the user info and press
                "Enter" to add the searched User to the display list
              </p>
            </div>
          </div>
        )}
        {!this.state.isLoading && this.state.userNotFound && (
          <>
            <div class="card text-center" style={{margin:"10px 40px"}}>
              <div class="card-body">
                <h5 class="card-title">Special title treatment</h5>
                <p class="card-text">USER NOT FOUND</p>
              </div>
            </div>
          </>
        )}
        {!this.state.isLoading && this.state.userAfterSearch && <h2>User Details here</h2>}
      </div>
    );
  }
}

export default SearchBar;
