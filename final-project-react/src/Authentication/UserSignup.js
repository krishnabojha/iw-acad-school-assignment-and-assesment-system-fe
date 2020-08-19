import React, { Component } from 'react'
import './UserSignUp.css'

export default class UserSignup extends Component {
    render() {
        return (
            <div>
                <form className = "signup-form">
                    <h2>User Signup</h2>
                    <label>Full name</label>
                    <input type = "text" required></input>
                    <label>Last name</label>
                    <input type = "text" required></input>
                    <label>Username</label>
                    <input type = "text" required></input>
                    <label>Email address</label>
                    <input type ="email" required></input>
                    <label>Password</label>
                    <input type = "password" required></input>
                    <label>Confirm password</label>
                    <input type = "password" required></input><br></br>
                    <button type = "submit">Signup</button>
                    <a href = "/login"><p className = "have-acc">Already have an account? Signin</p></a>

                </form>
            </div>
        )
    }
}
