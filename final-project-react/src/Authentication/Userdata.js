import React, { Component } from 'react'
import ShowClassItem from './ShowClassItem'
import './CreateClassForm.css'
// import { Redirect } from 'react-router'
// import { createHashHistory } from 'history'

export default class Userdata extends Component {
    state = {
        emailStored: false,
        obj:[],
        usertoken:[],
        createClass:false,
        userobj: [],
        createbtn: 'Create Class',
        newclassname:'',
        inClassroom: false,
        classid:'',
        testvariable: ''
    }
    async componentDidMount() {
        //fetching token to get user_id
        await fetch('http://127.0.0.1:8000/user/token/',{
            method: 'GET'
        }).then(response => response.json())
        .then(result => {
            console.log('this is result : ', result)
            this.setState({
                usertoken: result.filter(function(item){return item.key === localStorage.getItem('token')}),
            })
        })
       
        //fetching users to get email
        // if (this.state.emailStored === false) {
            await fetch('http://127.0.0.1:8000/user/list/',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+localStorage.getItem('token')
            },
        }).then((respone)=>respone.json())
        .then(result =>{
            const {usertoken} = this.state
            console.log('this is result: before',usertoken[0].user_id)
            if (usertoken[0] === undefined){
                window.location.reload()
            }
            this.setState({
                userobj: result.filter(function(item){return item.id === usertoken[0]['user_id']})
            })
            console.log('this is user email', this.state.userobj[0].email)
            /// storing the email to the local storage
            localStorage.setItem('email',this.state.userobj[0].email)
        })
        // this.setState({
        //     emailStored: true
        // })
        console.log('this is emailstored: ',this.state.emailStored)
        // }
        //fetching list of class that is link with logged in user
        const studentuser = await fetch('http://127.0.0.1:8000/data/myclasses_list/'+this.state.usertoken[0].user_id)
        const userjson = await studentuser.json()
        console.log('classes related to user id 1', userjson)
        this.setState({
            obj: userjson
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
            console.log('success: created class',result)
            console.log(result.id)
            console.log(this.state.usertoken[0].user_id)
            const linkclassdata = new FormData()
            linkclassdata.append('classroom_id',result.id)
            linkclassdata.append('user_id', this.state.usertoken[0].user_id)
            fetch('http://127.0.0.1:8000/data/myclasses_create/',{
                method: 'POST',
                body:linkclassdata
            }).then(respone => respone.json())
            .then(result =>{
                console.log("setup is success")
            })
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
            window.location.reload()
        }
    }
    onChangeInput =(event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onEnterRoom =(id)=> {
        this.setState({
            inClassroom: true,
            classid:id
        })
    }
    onGoBack =()=>{
        window.location.reload()
    }
    render() {
        const abc = this.onEnterRoom
        console.log('this is obj: ', this.state.obj)
        console.log('this is testvariable', this.state.testvariable)
        const {newclassname} = this.state
        return (
            <div>
                 {/* side bar */}
                 <div className = "side-bar">
                    
                </div>
                <div className = 'top-bar'>
                {   
                (this.state.inClassroom === true)?
                    <div className = 'back-arrow' title = 'goto back' onClick = {this.onGoBack}>
                        <img src="https://img.icons8.com/fluent//000000/left.png" alt = ''/>               
                    </div>
                    :<h3 className = 'class-title'>My Class Room</h3>
                
                }
                
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

                <div className = "classes-div">
                {  
                (this.state.inClassroom === false)?
                    this.state.obj.map(function(item){
                        return (<div className = "single-class" key = {item.id} onClick = {abc.bind(this,  item.id)}>
                         <h3>{item.classname}</h3>
                        <h3>{item.email}</h3>
                        </div>)
                    })
                    : <ShowClassItem classid = {this.state.classid}></ShowClassItem>
                }
                </div>
            </div>
        )
    }
}

