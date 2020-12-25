import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";

export class DisplayTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
    };
  }

  componentDidMount() {
    var userArr = JSON.parse(localStorage.getItem("users"));
    // console.log("The Users From Local Storage Are:",userArr)
    this.setState(
      {
        userList: userArr,
      },
      () => {
        // console.log("After Set State:",this.state.userList)
      }
    );
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
    localStorage.setItem("users",JSON.stringify(newItems))
    window.location.reload()
  };

  render() {
    return (
      <div>
        <h2>Displaying Added User Here</h2>
        {this.state.userList.map((each) => {
          //   console.log("Each is:", each);
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
                      }}
                    />
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer.
                      </p>
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
        })}
      </div>
    );
  }
}

export default DisplayTable;
