import React, { Component } from "react";

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parameter: "",
    };
  }

  async componentDidMount() {
    // console.log("Search the Github API with ",this.state.parameter)
    if (this.state.parameter) {
      let userData = await fetch(
        `https://api.github.com/users/${this.state.parameter}`
      );
      let displayData = await userData.json();
      console.log("Data is now:", displayData);
    }
  }

  render() {
    return (
      <div>
        <h2>Search bar Here</h2>
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
                // console.log("After Set State:",this.state.parameter)
              }
            );
          }}
        />
      </div>
    );
  }
}

export default SearchBar;
