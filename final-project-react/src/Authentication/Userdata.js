import React, { Component } from 'react'
import ShowClassItem from './ShowClassItem'
import './CreateClassForm.css'
import UserProfile from './UserProfile'

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
        displaymenu: false,
        showmessage: false,
        invitationlink: '',
        classemail: '',
        userprofileobj: [],
        showProfile: false,
        userName: '',
        fullname: '',
    }
    async componentDidMount() {
        // check whether the link is referal or not
        const urllink = window.location.href.split('/')
        const urllistlength = urllink.length

        //fetching token to get user_id
        await fetch('https://serene-wave-21722.herokuapp.com/user/token/',{
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
            await fetch('https://serene-wave-21722.herokuapp.com/user/list/',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+localStorage.getItem('token')
            },
        }).then((respone)=>respone.json())
        .then(result =>{
            const {usertoken} = this.state
            console.log('this is result: before',usertoken[0].user_id)
            localStorage.setItem('UserId', usertoken[0].user_id)
            if (usertoken[0] === undefined){
                window.location.reload()
            }
            this.setState({
                userobj: result.filter(function(item){return item.id === usertoken[0]['user_id']})
            })
            console.log('this is user name ho', this.state.userobj[0].username)
            this.setState({
                userName: this.state.userobj[0].username,
                fullname: this.state.userobj[0].first_name + ' '+ this.state.userobj[0].last_name
            })
            /// storing the email to the local storage
            localStorage.setItem('email',this.state.userobj[0].email)
        })

        console.log('this is emailstored: ',this.state.emailStored)
        // }
        //fetching list of class that is link with logged in user
        const studentuser = await fetch('https://serene-wave-21722.herokuapp.com/data/myclasses_list/'+this.state.usertoken[0].user_id)
        const userjson = await studentuser.json()
        console.log('classes related to user id 1', userjson)
        this.setState({
            obj: userjson
        })
        console.log('Token ', localStorage.getItem('token'))
        // console.log('this is email haha', localStorage.getItem('email'))
        // join as a student using referal link
        if((urllink[urllistlength-1] !== undefined) && (urllink[urllistlength-2] === 'class') && (urllink[urllistlength-3] === 'join')){
            console.log('you are joined to class using referal link')
            console.log(parseInt(urllink[urllistlength-1]))
            const linkclassdata = new FormData()
            linkclassdata.append('classroom_id', parseInt(urllink[urllistlength-1]))
            linkclassdata.append('user_id', this.state.usertoken[0].user_id)
            fetch('https://serene-wave-21722.herokuapp.com/data/myclasses_create/',{
                method: 'POST',
                body:linkclassdata
            }).then(respone => respone.json())
            .then(result =>{
                console.log("setup is success")
            })
        }
        //fetching profile of user from api
        const porfile = await fetch('https://serene-wave-21722.herokuapp.com/data/userinfo_list/'+this.state.usertoken[0].user_id)
        const userprofile = await porfile.json()
        this.setState({
            userprofileobj: userprofile[0]
        })
        console.log('this is userprofile', this.state.userprofileobj)
      
    }
    onHandleSubmit=()=>{
        //creating a new classroom
        const newclass = new FormData()
        newclass.append('classname', this.state.newclassname)
        newclass.append('email', localStorage.getItem('email'))
        fetch('https://serene-wave-21722.herokuapp.com/data/studymaterial_class_create/',{
            method: 'POST',
            body:newclass
        }).then(response => response.json())
        .then(result =>{
            const linkclassdata = new FormData()
            linkclassdata.append('classroom_id',result.id)
            linkclassdata.append('user_id', this.state.usertoken[0].user_id)
            fetch('https://serene-wave-21722.herokuapp.com/data/myclasses_create/',{
                method: 'POST',
                body:linkclassdata
            }).then(respone => respone.json())
            .then(result =>{
                console.log("setup is success", result)
            })
        })
        .catch(error=>{
            console.log('error: ',error)
        })
    }
    // delete class by user
    onDeleteClass = (event) =>{
        fetch('https://serene-wave-21722.herokuapp.com/data/studymaterial_class_delete/'+this.state.classid,{
            method:'DELETE'
        }).then(response=>response.json())
        .then(result=>{
            console.log('result class delete:', result)
        }).then(error=>{
            console.log('error class delete:',error)
        })
        event.preventDefault();
        window.location.reload()
    }
    //logout user by removing the token saved in browser
    onLogout =()=>{
        localStorage.removeItem('token')
        // localStorage.removeItem('email')
        window.location.reload();
    }
    //create new class
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
            // window.location.reload()
        }
    }
    onChangeInput =(event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    // enter into the clicked class
    onEnterRoom =(id, email)=> {
        this.setState({
            inClassroom: true,
            classid:id,
            classemail: email,
            invitationlink: 'https://serene-wave-21722.herokuapp.com/join/class/'+id  // use the valid url before /join while hosting

        })
       
    }
    //goto previous page
    onGoBack =()=>{
        window.location.reload()
    }
    //show profile and logout in menu
    onshowmenu =()=>{
        if (this.state.displaymenu === false){
            this.setState({
                displaymenu:true
            })
        }
        else{
            this.setState({
                displaymenu:false
            })
        }
    }
    //show copied message on press of invite
    onshowmessage = () =>{

        if(this.state.showmessage === false){
            navigator.clipboard.writeText(this.state.invitationlink)
            this.setState({
                showmessage: true,
            })
        }
        else{
            this.setState({
                showmessage:false
            })
        }
    }
    onHideCopiedmessage = () =>{
        this.setState({
            showmessage:false
        })
    }
    // show profile of user in cart
    showProfileCart =()=>{
        if(this.state.showProfile === false){
            this.setState({
                showProfile: true
            })
        }
        else{
            this.setState({
                showProfile: false
            })
        }
    }
    render() {
        const abc = this.onEnterRoom
        const {newclassname} = this.state
        
        return (
            <div className = "most-outer-div">
                 {/* side bar */}
                {/* <div className = "side-bar">
                </div> */}
                <div className = 'top-bar'>
                    {/* profile picture of logged in user */}
                    <div className = 'login-info' onClick = {this.onshowmenu}>
                        {
                            (this.state.userprofileobj === undefined || this.state.userprofileobj.profileImg === null)?
                            <img src="https://img.icons8.com/material/40/000000/user-male-circle--v1.png" alt = ""/>                    
                            :<img src={this.state.userprofileobj.profileImg} alt = ""/>                    
                        }
                    </div>

                {   
                (this.state.inClassroom === true)?
                    <div className = 'back-arrow' title = 'goto back' onClick = {this.onGoBack}>
                        <img src="https://img.icons8.com/fluent//000000/left.png" alt = ''/>               
                    </div>
                    :<h3 className = 'class-title'>My Class Room</h3>
                
                }
                
                <div className = 'logout-btn'>
                    <button type = 'submit' onClick = {this.onCreateClass}>{this.state.createbtn}</button>
                    {   
                        (this.state.inClassroom === true && (this.state.classemail === localStorage.getItem('email')))?
                        <button className = "invite-btn" onClick = {this.onshowmessage} onMouseOutCapture = {this.onHideCopiedmessage}>Invite</button>
                        :<p></p>
                    }
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
                        return (<div className = "single-class" key = {item.id} onClick = {abc.bind(this,  item.id, item.email)}>
                         <h3>{item.classname}</h3>
                        {/* <h3>{item.email}</h3> */}
                        </div>)
                    })
                    : <ShowClassItem classid = {this.state.classid}></ShowClassItem>
                }
                </div>

                {   (this.state.showmessage === true)?
                    <div className = "invite-message">
                        <p>Invitation code is copied !!!</p>
                    </div>
                    :<p></p>
                }
                {   (this.state.displaymenu === true)?
                    <div className="vertical-menu">
                        <div></div>
                        <a onClick = {this.showProfileCart}>Profile</a>
                        <a onClick = {this.onLogout}>Logout</a>
                        {
                            (this.state.inClassroom === true && (this.state.classemail === localStorage.getItem('email')))?
                            <a onClick = {this.onDeleteClass}>Delete Class</a>
                            :<p></p>
                        }
                    </div>
                    :<p></p>
                }

                {
                    (this.state.showProfile === true)?
                    <UserProfile showProfile = {this.showProfileCart} userName = {this.state.userName} fullname = {this.state.fullname}  userprofile = {this.state.userprofileobj} ></UserProfile>
                    :<p></p>
                }
            </div>
        )
    }
}

