import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";

export class DisplayTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      getRepoByName:"",
      RepoList: [],

    };
  }

  async componentDidMount() {
    var userArr = JSON.parse(localStorage.getItem("users"));
    this.setState(
      {
        userList: userArr,
      },
      () => {
        // console.log("After Set State:",this.state.userList)
      }
    );
    if(this.state.getRepoByName){
        console.log("In Get Repo By Name",this.state.getRepoByName)
        let userRepo= await fetch(`https://api.github.com/users/${this.state.getRepoByName.split(" ")[0]}/repos`)
        let displayRepo=await userRepo.json()
        // console.log(displayRepo)
        this.setState({
            RepoList: displayRepo
        },()=>{
            console.log("After Set State:",this.state.RepoList)
        })
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
    localStorage.setItem("users",JSON.stringify(newItems))
    window.location.reload()
  };

  render() {
    return (
      <div style={{margin:"80px"}}>
        <h2 class="alert alert-info">My User List</h2>
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
                        border:"3px solid blue"
                      }}
                    />
                    <div class="card-body">
                    <h5 class="card-title">{each.name}</h5>
                      <p class="card-text">
                        <button value={each.name} onClick={(e)=>{
                            console.log("Viewing",e.target.value)
                            this.setState({
                                getRepoByName: e.target.value
                            },()=>{
                                this.componentDidMount()
                            })
                        }}>View Repositories</button>
                      </p>
                      {this.state.getRepoByName===each.name && (
                          <ul>
                              {this.state.RepoList.map(e=>{
                                  return <li>{e.full_name}</li>
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
        })}
      </div>
    );
  }
}

export default DisplayTable;
