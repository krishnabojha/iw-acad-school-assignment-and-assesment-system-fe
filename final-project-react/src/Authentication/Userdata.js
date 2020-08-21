import React, { Component } from 'react'
// import CreateClassForm from './CreateClassForm'
import './CreateClassForm.css'

export default class Userdata extends Component {
    state = {
        emailStored: false,
        obj:[],
        usertoken:[],
        createClass:false,
        userobj: [],
        createbtn: 'Create Class',
        newclassname:'',
    }
    componentDidMount=()=>{
        //fetching token to get user_id
        fetch('http://127.0.0.1:8000/user/token/',{
            method: 'GET'
        }).then(response => response.json())
        .then(result => {
            console.log('this is result : ', result)
            this.setState({
                usertoken: result.filter(function(item){return item.key === localStorage.getItem('token')}),
            })
        })
       
        //fetching users to get email
        if (this.state.emailStored === false) {
            fetch('http://127.0.0.1:8000/user/list/',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+localStorage.getItem('token')
            },
        }).then((respone)=>respone.json())
        .then(result =>{
            const {usertoken} = this.state
            console.log('this is result: before',result)
            this.setState({
                userobj: result.filter(function(item){return item.id === usertoken[0]['user_id']})
            })
            console.log('this is user email', this.state.userobj[0].email)
            /// storing the email to the local storage
            localStorage.setItem('email',this.state.userobj[0].email)
        })
        this.setState({
            emailStored: true
        })
        console.log('this is emailstored: ',this.state.emailStored)
        }
       
        // fetching class room to get class room of logged in user 
        fetch('http://127.0.0.1:8000/data/studymaterial_class_list/',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+localStorage.getItem('token')
            },
        }).then((respone)=>respone.json())
        .then(result =>{
            this.setState({
                obj: result.filter(function(value){return value.email === localStorage.getItem('email')})
            })
        })
        
        console.log('Token ', localStorage.getItem('token'))
        console.log('this is email haha', localStorage.getItem('email'))
    }
    onHandleSubmit=()=>{
        //creating a new classroom
        const newclass = new FormData()
        newclass.append('classname', this.state.newclassname)
        newclass.append('email', localStorage.getItem('email'))
        fetch('http://127.0.0.1:8000/data/studymaterial_class_create/',{
            method: 'POST',
            body:newclass
        }).then(response => response.json())
        .then(result =>{
            console.log('success: ',result)
        })
        .catch(error=>{
            console.log('error: ',error)
        })
    }
    onLogout =()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        window.location.reload();
    }
    onCreateClass =()=>{
        if(this.state.createClass === false){
            this.setState({
                createClass: true,
                createbtn: 'Submit'
            })
        }
        else if (this.state.createClass === true && this.state.newclassname === ''){
            this.setState({
                createClass: false,
                createbtn: 'Create Class'
            })
        }
        else{
            this.setState({
                createClass: false,
                createbtn: 'Create Class'
            })
            this.onHandleSubmit()
        }
    }
    onChangeInput =(event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        console.log('this is obj: ', this.state.obj)
        const {newclassname} = this.state
        return (
            <div>
                <div className = 'top-bar'>
                <div className = 'logout-btn'>
                    <button type = 'submit' onClick = {this.onCreateClass}>{this.state.createbtn}</button>
                    <button onClick = {this.onLogout}>Logout</button>
                </div>
                {
                        (this.state.createClass === true)?
                        <div className = 'create-class-form'>
                            <input type = 'text' name = 'newclassname' value = {newclassname} placeholder = 'Enter name of new Class' required onChange = {this.onChangeInput}></input>
                        </div>
                        : <p></p>
                    }
                </div>
                {/* side bar */}
                <div className = "side-bar">
                    
                </div>

                <div className = "classes-div">
                {   
                    this.state.obj.map(function(item){
                        return (<div key = {item.id}>
                         <h3>{item.classname}</h3>
                        <h3>{item.email}</h3>
                        </div>)
                    })
                }
                </div>
            </div>
        )
    }
}
