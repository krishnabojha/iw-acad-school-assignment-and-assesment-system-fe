import React, { Component } from 'react'
import './UserLogin.css'

export default class UserLogin extends Component {
    render() {
        return (
            <div>
                <form className = "signin-form">
                    <h2>User Login</h2>
                    <label>Username</label>
                    <input type = "text" required></input>
                    <label>Password</label>
                    <input type = "password" required></input>
                    <a href = "https://www.google.com/"><p className = "forget-pass">Forget password? reset password</p></a>
                    <button type = "submit">Login</button>
                    <a href = "/signup"><p className = "create-acc">Don't have account? Create one</p></a>
                </form>
            </div>
        )
    }
}
