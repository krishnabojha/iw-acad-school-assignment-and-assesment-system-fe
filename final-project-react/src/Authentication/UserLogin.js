import React, { Component } from 'react'
import './UserLogin.css'

export default class UserLogin extends Component {
    state = {
        username: '',
        password: '',
    }
    jumpSignup = () =>{
        this.props.showsignup()
    }

    handleSubmit = (event) =>{

        const formdata = new FormData()
        formdata.append('username', this.state.username)
        formdata.append('password', this.state.password)
        fetch('http://127.0.0.1:8000/user/login/', {
        method: 'POST',
        Header: 'context-Type: application/json',
        body: formdata
        }
        ).then((response) =>response.json())
        .then((result)=>{
            console.log('success', result)
            console.log('this is token: ', result.token)
            localStorage.setItem('token',result.token)
        })
        .catch((error)=>{
            console.error('Error:',error)
        })
        event.preventDefault();
        console.log('this is token from browser', localStorage.getItem('token'))

    }
    onChangeinput =(event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        console.log('hello krishna', localStorage.getItem('token'))
        if((localStorage.getItem('token') !== undefined) && localStorage.getItem('token') !== null){
            window.location.reload();
        }
        console.log('local token : ',localStorage.getItem('token'))
        const {username, password} = this.state
        return (
            <div>
                <form className = "signin-form" onSubmit = {this.handleSubmit}>
                    <h2>User Login</h2>
                    <label>Username</label>
                    <input type = "text" name = "username" value = {username} required onChange = {this.onChangeinput}></input>
                    <label>Password</label>
                    <input type = "password" name = "password" value = {password} required onChange = {this.onChangeinput}></input>
                    <a href = "https://www.google.com/"><p className = "forget-pass">Forgot password? reset password</p></a>
                    <button type = "submit">Login</button>
                    <p className = "create-acc" onClick = {this.jumpSignup}>Don't have account? Create one</p>
                </form>
            </div>
        )
    }
}
