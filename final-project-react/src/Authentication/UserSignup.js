import React, { Component } from 'react'
import './UserSignUp.css'

export default class UserSignup extends Component {
    state = {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        Cpassword: '',
        passMatch: 'none'
    }

    handleSubmit = (event) =>{

        const formdata = new FormData()
        formdata.append('first_name', this.state.first_name)
        formdata.append('last_name', this.state.last_name)
        formdata.append('username', this.state.username)
        formdata.append('email', this.state.email)
        formdata.append('password', this.state.password)
        if(this.state.password.length >7){
            if (this.state.password === this.state.Cpassword) {
                fetch('https://serene-wave-21722.herokuapp.com/user/create/', {
                method: 'POST',
                body: formdata
                }
                ).then((response) =>response.json())
                .then((result)=>{
                    console.log('success', result)
                    // creating user profile for logged in user
                        const newdata = new FormData()
                        newdata.append('userid', result.id)
                        fetch('https://serene-wave-21722.herokuapp.com/data/userinfo_create/',{
                            method: 'POST',
                            body: newdata
                        }).then(response => response.json())
                        .then(result => {
                            console.log('this is created result', result)
                        })
                    this.props.showlogin()
                })
                .catch((error)=>{
                    console.error('Error:',error)
                })
            }
            else{
                this.setState({
                    passMatch: 'block'
                })
            }
        }
        else{
            alert('Use more than 8 character in password')
        }
        event.preventDefault();

    }
    onChangeinput = (event) =>{
        this.setState({
            [event.target.name]: event.target.value,
            passMatch: 'none'
        })
    }
    jumpLogin = () =>{
        this.props.showlogin()
    }
    render() {
        const {first_name, last_name, username, email, password, Cpassword} = this.state
        return (
            <div>
                <form className = "signup-form" onSubmit = {this.handleSubmit}>
                    <h2>User Signup</h2>
                    <label>First name</label>
                    <input type = "text" name = 'first_name' value = {first_name} placeholder = '' required onChange = {this.onChangeinput}></input>
                    <label>Last name</label>
                    <input type = "text" name = 'last_name' value = {last_name} required onChange = {this.onChangeinput}></input>
                    <label>Username</label>
                    <input type = "text" name = 'username' value = {username} required onChange = {this.onChangeinput}></input>
                    <label>Email address</label>
                    <input type ="email" name = 'email' value = {email} required onChange = {this.onChangeinput}></input>
                    <label>Password</label>
                    <input type = "password" name = 'password' value = {password} required onChange = {this.onChangeinput}></input>
                    <label>Confirm password</label>
                    <input type = "password" name = 'Cpassword' value = {Cpassword} onChange = {this.onChangeinput}></input><br></br>
                    <p className = "alert" style = {{display: this.state.passMatch}}>password did not match</p>
                    <button type = "submit">Signup</button>
                    <p className = "have-acc" onClick = {this.jumpLogin}>Already have an account? Signin</p>

                </form>
            </div>
        )
    }
}
