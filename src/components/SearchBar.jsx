import React, { Component } from "react";

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parameter: "",
      userNotFound: false,
      userAfterSearch: false,
    };
  }

  async componentDidMount() {
    // console.log("Search the Github API with ",this.state.parameter)
    if (this.state.parameter) {
      let userData = await fetch(
        `https://api.github.com/users/${this.state.parameter}`
      );
      let displayData = await userData.json();
      if (displayData.message === "Not Found") {
        // console.log("User Not Found");
        this.setState({
          userNotFound: true,
        });
      } else {
        console.log("Data is now:", displayData);
        this.setState({ userNotFound:false,userAfterSearch: true });
      }
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.parameter}
          placeholder="Enter Github Username Here"
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
        {!this.state.parameter && <h2>Empty Search bar</h2>}
        {this.state.userNotFound && (
          <>
            <div class="card text-center">
              <div class="card-header">Featured</div>
              <div class="card-body">
                <h5 class="card-title">Special title treatment</h5>
                <p class="card-text">
                  USER NOT FOUND
                </p>
                <a href="#" class="btn btn-primary">
                  Go somewhere
                </a>
              </div>
              <div class="card-footer text-muted">2 days ago</div>
            </div>
          </>
        )}
        {this.state.userAfterSearch && (
            <h2>User Details here</h2>
        )}
      </div>
    );
  }
}

export default SearchBar;
