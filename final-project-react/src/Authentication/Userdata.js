import React, { Component } from 'react'

export default class Userdata extends Component {
    state = {
        obj:[],
        username: '',
        email: '',
        first_name: ''
    }
    componentDidMount=()=>{
        fetch('http://127.0.0.1:8000/user/list/',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+localStorage.getItem('token')
            },
            
        
        }).then((respone)=>respone.json())
        .then(result =>{
            this.setState({
                obj: result
            })
        })
        console.log('Token ', localStorage.getItem('token'))
    }
    render() {
        console.log(this.state.obj)
        return (
            <div>
                {
                    this.state.obj.map(item =>(
                        <div>
                         <h3>{item.username}</h3>
                        <h3>{item.email}</h3>
                        </div>
                    ))
                }
            </div>
        )
    }
}
