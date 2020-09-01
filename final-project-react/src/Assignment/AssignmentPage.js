import React, { Component } from 'react'
import './AssignmentPage.css'
import cancel_icon from '../images/cancel_icons.png'

export default class AssignmentPage extends Component {
    state = {
        answer:''
    }
    handleSubmitAnswer=()=>{
        const submitdata = new FormData()
        submitdata.append('assignment_id', this.props['assignment'].id)
        submitdata.append('submitter', localStorage.getItem('UserId'))
        submitdata.append('files', this.state.answer[0])
        fetch('http://127.0.0.1:8000/assignment/assignmentsubmit/create/',{
            method: 'POST',
            body: submitdata
        }).then(response => response.json())
        .then(result=>{
            console.log('success: ', result)
        }).catch(error=>{
            console.log('error:', error)
        })
        this.HidePage()
    }
    onImportFile =(event)=>{
        this.setState({
            [event.target.name]: event.target.files
        })
    }
    HidePage =()=>{
        this.props.assignmentPage()
    }
    render() {
        return (
            <div className = "assignment-page">
                <img className = "cancel-assignment" src = {cancel_icon} alt = "" onClick = {this.HidePage}></img>
                <div className = "assignmentform">
                    <h3 className = 'question'>Question:</h3>
                    <input type = "text" className = "question-field" disabled value = {this.props['assignment'].file_title}></input>
                    <h3 className ="due_date">Due: {this.props['assignment'].due_date}</h3><br></br>
                    <h3>File:</h3>
                    <a href = {this.props['assignment'].files}>
                    <div className = "pdf-file">
                        <img src = 'https://img.icons8.com/fluent/48/000000/task.png' alt = ""></img>
                        <span className = 'question-message'>Click to see Questions</span>
                    </div></a><br></br>
                    <h3>Submit Answer:</h3>
                    <input type = "file" name="answer" onChange={this.onImportFile}></input>
                    <span className = "grade">Grade: 8/10</span><br></br>
                    <button className = "submit-assignment" onClick = {this.handleSubmitAnswer}>Submit</button>
                </div>
            </div>
        )
    }
}
