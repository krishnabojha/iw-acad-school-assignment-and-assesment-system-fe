import React, { Component } from 'react'
import './UserLogin.css'

export default class UserLogin extends Component {
    state = {
        otppassword: '',
        newpassword: '',
        confirmpassword: '',
        OTPcode:''
    }
    componentDidMount = () =>{
        //request backend to send OTP code to the mail
        const min =1000;
        const max = 9999;
        const rand = min + Math.random() * (max - min);
        const OTPdata = new FormData()
        OTPdata.append('email', localStorage.getItem('email'))
        OTPdata.append('otpcode', parseInt(rand))
        console.log('userid', localStorage.getItem('UserId'))
        this.setState({
            OTPcode: parseInt(rand)
        })
        fetch('https://serene-wave-21722.herokuapp.com/user/send_otp/', {
            method: 'POST',
            body: OTPdata
        }).then(result =>{
            console.log('success:', result)
        }).then(error =>{
            console.log('error:', error)
        })

    }
    onGoBack = () =>{
        this.props.onshowlogin()
    }
    handleSubmit = (event) =>{
        // reset password of the user
        const formdata = new FormData()
        // check whether the password and confirm password is same or not
        if(this.state.newpassword === this.state.confirmpassword){
            // check whether the entered OTP is correct or not
            if(this.state.OTPcode === parseInt(this.state.otppassword)){
                formdata.append('newpassword', this.state.newpassword)
            fetch('https://serene-wave-21722.herokuapp.com/user/reset_password/'+localStorage.getItem('UserId'), {
            method: 'POST',
            Header: 'context-Type: application/json',
            body: formdata
            }
            ).then((response) =>response.json())
            .then((result)=>{
                console.log('success', result)
                this.onGoBack()
            })
            .catch((error)=>{
                console.error('Error:',error)
            })
            }
            else{
                alert('Please enter correct OTP code.')
            }
        }
        else{
            alert('Confirmation password did not match')
        }
        event.preventDefault();

    }
    onChangeinput =(event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
 
    render() {
        const {otppassword, newpassword, confirmpassword} = this.state
        return (
            <div>
                <form className = "signin-form" onSubmit = {this.handleSubmit}>
                    <h2>Reset password</h2>
                    <label>OTP Code</label>
                    <input type = "number" name = "otppassword" value = {otppassword} required onChange = {this.onChangeinput}></input>
                    <label>Password</label>
                    <input type = "password" name = "newpassword" value = {newpassword} required onChange = {this.onChangeinput}></input>
                    <label>Confirm Password</label>
                    <input type = "password" name = "confirmpassword" value = {confirmpassword} required onChange = {this.onChangeinput}></input>
                    <div className = 'btn-section'>
                        <button type = "submit">submit</button>
                        <button type = 'button' onClick = {this.onGoBack}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}
