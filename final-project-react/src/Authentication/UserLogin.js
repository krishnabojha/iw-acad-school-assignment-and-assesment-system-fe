import React, { Component } from 'react'
import './UserLogin.css'
import ResetPassword from './ResetPassword'

export default class UserLogin extends Component {
    state = {
        username: '',
        password: '',
        loginpage: true,
    }
    jumpSignup = () =>{
        this.props.showsignup()
    }

    handleSubmit = (event) =>{

        const formdata = new FormData()
        formdata.append('username', this.state.username)
        formdata.append('password', this.state.password)
        fetch('https://serene-wave-21722.herokuapp.com/user/login/', {
        method: 'POST',
        Header: 'context-Type: application/json',
        body: formdata
        }
        ).then((response) =>response.json())
        .then((result)=>{
            console.log('success', result)
            if(result.token === undefined){
                alert('Enter Correct Password')
            }
            localStorage.setItem('token',result.token)
            if(result.token.length >=15 && result.token !== undefined){
                window.location.reload()
            }
        })
        .catch((error)=>{
            console.error('Error:',error)
        })
        console.log('this is token from browser', localStorage.getItem('token'))
        event.preventDefault();

    }
    onChangeinput =(event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onResetPassword = () =>{
        if(this.state.loginpage === true){
            this.setState({
                loginpage: false
            })
        }
        else{
            this.setState({
                loginpage: true
            })
        }
    }
    onShowLogin = () =>{
        this.setState({
            loginpage: true
        })
    }
    render() {

        console.log('local token : ',localStorage.getItem('token'))
        const {username, password} = this.state
        return (
            <div>
                {
                    (this.state.loginpage === true)?
                    <form className = "signin-form" onSubmit = {this.handleSubmit}>
                        <h2>User Login</h2>
                        <label>Username</label>
                        <input type = "text" name = "username" value = {username} required onChange = {this.onChangeinput}></input>
                        <label>Password</label>
                        <input type = "password" name = "password" value = {password} required onChange = {this.onChangeinput}></input>
                        <p className = "forget-pass" onClick = {this.onResetPassword}>Forgot password? reset password</p>
                        <button type = "submit">Login</button>
                        <p className = "create-acc" onClick = {this.jumpSignup}>Don't have account? Create one</p>
                    </form>
                    :<ResetPassword onshowlogin = {this.onShowLogin}></ResetPassword>

                }
            </div>
        )
    }
}
