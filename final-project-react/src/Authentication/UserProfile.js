import React, { Component } from 'react'
import './UserProfile.css'
import cancel_icon from '../images/cancel_icons.png'

export default class UserProfile extends Component {
    
    state = {
        editbio: true,
        editaddress: true,
        showsubmitbtn: false,
        content: 'this is bio data',
        userdetail: [],
        address: 'Address',
        bio: 'Bio',
        profileImg: ''
    }

    componentDidMount =()=>{
        console.log('address',this.props['userprofile'].address)
        this.setState({
            address: this.props['userprofile'].address,
            bio: this.props['userprofile'].bio
        })
    }
// submit the edited content
    onhandleSubmit =(event)=>{
        
        // updating the profile 
        const newdata = new FormData()
        newdata.append('profileImg', this.state.profileImg[0])
        newdata.append('address', this.state.address)
        newdata.append('bio', this.state.bio)
        newdata.append('userid', this.props['userprofile'].userid)
        fetch('https://serene-wave-21722.herokuapp.com/data/userinfo_update/'+this.props['userprofile'].id,{
            method: 'PUT',
            body: newdata
        }).then(response => response.json())
        .then(result => {
            this.onhideProfile()
            console.log('this is updated result', result)
            window.location.reload()
        })
        
    }
    onChangeInfo =(event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onChangeProfileImg = (event) =>{
        this.setState({
            [event.target.name] : event.target.files
        })
    }
    onEditBio = () =>{
        if(this.state.editbio === true){
            this.setState({
                editbio: false,
                showsubmitbtn: true
            })
        }
        else{
            this.setState({
                editbio: true
            })
        }
        
    }
    onEditAddress=()=>{
        if(this.state.editaddress === true){
            this.setState({
                editaddress: false,
                showsubmitbtn: true
            })
        }
        else{
            this.setState({
                editaddress: true
            })
        }
    }
    onhideProfile =()=>{
        this.props.showProfile()
    }
    showsubmitbtn=()=>{
        this.setState({
            showsubmitbtn: true
        })
    }
    render() {
        const {bio, address} = this.state
        console.log('this is userdetail', this.props)
        console.log('conti', this.props['userprofile'].profileImg)
        return (
            <div className = "card">
                <div className = "cancel-div">
                    <img src = {cancel_icon} alt = "images" onClick = {this.onhideProfile}></img>
                </div>
                <img className = 'capture-img' src="https://img.icons8.com/android/24/000000/camera.png" alt = "" /><input className = "get-img" type = 'file' name = 'profileImg' onChange = {this.onChangeProfileImg} onClick = {this.showsubmitbtn}/>
                {
                     (this.props['userprofile'].profileImg === '' || this.props['userprofile'].profileImg === null)?
                    <img className = 'profile-img' src = "https://img.icons8.com/material/40/000000/user-male-circle--v1.png"  alt="" style={{width:100}}></img>
                     :<img className = 'profile-img' src={this.props['userprofile'].profileImg} alt="" style={{width:100}}></img>
                }
                
                <h1>{this.props['userName']}</h1>
            <p className="title">{this.props['fullname']}</p>
                <p>{localStorage.getItem('email')}</p>
                <input type = "text" disabled = {this.state.editbio} name = 'bio' value = {bio} onChange = {this.onChangeInfo}></input>
                <img className = 'edit-icon' src="https://img.icons8.com/windows/16/000000/edit.png" alt = "" onClick = {this.onEditBio}/>
                <input type = "text" disabled = {this.state.editaddress} name = 'address' value = {address} onChange = {this.onChangeInfo}></input>
                <img className = 'edit-icon' src="https://img.icons8.com/windows/16/000000/edit.png" alt = "" onClick = {this.onEditAddress} />
                {
                    (this.state.showsubmitbtn === true)?
                    <button className = "edit-submit" onClick = {this.onhandleSubmit}>Edit Details</button>
                    :<div className = "none-submit"></div>
                }
                
            </div>
        )
    }
}
