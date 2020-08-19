import React, { Component } from 'react'
// import SMaterialBlock from './Studycomponents/SMaterialBlock'
// import UserLogin from './Authentication/UserLogin'
import UserSignUp from './Authentication/UserSignup'
import UserLogin from './Authentication/UserLogin'
// import UserLogin from './Authentication/UserLogin'
import {BrowserRouter, Route} from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <div>
        {/* <UserSignUp></UserSignUp> */}
        <BrowserRouter>
        <Route path = "/signup" render = {()=>(<UserSignUp></UserSignUp>)}></Route>
        <Route exact path = "/login" render = {()=>(<UserLogin></UserLogin>)}></Route>
        </BrowserRouter>
        {/* <UserLogin></UserLogin> */}
        {/* <SMaterialBlock></SMaterialBlock> */}
      </div>
    )
  }
}
