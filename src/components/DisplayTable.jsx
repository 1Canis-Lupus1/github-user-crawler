import React, { Component } from 'react'

export class DisplayTable extends Component {
    constructor(props){
        super(props);
        this.state={
            userList:[]
        }
    }

    componentDidMount(){
        // var name=localStorage.getItem()
    }

    render() {
        return (
            <div>
                <h2>Displaying Added User Here</h2>
            </div>
        )
    }
}

export default DisplayTable
