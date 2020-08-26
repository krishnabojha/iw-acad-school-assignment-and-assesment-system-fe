import React, { Component } from 'react'
// import SMaterialBlock from './Studycomponents/SMaterialBlock'
// import UserLogin from './Authentication/UserLogin'
import UserSignUp from './Authentication/UserSignup'
import UserLogin from './Authentication/UserLogin'
import Userdata from './Authentication/Userdata'

export default class App extends Component {
  state = {
    registered: true,
  }
  showLoginForm = () =>{
    this.setState({
      registered: true,
    })
  }
  showSignupForm = () =>{
    this.setState({
      registered:false,
    })
  }
  loggedIn =()=>{
    this.setState({
      registered: 'loggedin'
    })
  }
  render() {
    
    if (!localStorage.getItem('token') || localStorage.getItem('token').length <= 10 ) {
      return (
        <div>
          {/* <UserSignUp></UserSignUp> */}
          {
            (this.state.registered === true )?
            <UserLogin showsignup = {this.showSignupForm}></UserLogin>
            :<UserSignUp showlogin = {this.showLoginForm}></UserSignUp>

          }
                      
          {/* <UserLogin></UserLogin> */}
          {/* <SMaterialBlock></SMaterialBlock> */}
        </div>
      )
    }
    else {
      console.log('this is token', localStorage.getItem('token'))
      return(
        // <SMaterialBlock></SMaterialBlock>
        <Userdata></Userdata>
      )
    }
  }
}
