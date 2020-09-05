import React, { Component } from 'react'
import cancel_icon from '../images/cancel_icons.png'
import './AssignmentCheck.css'

export default class RateAssignment extends Component {
    state = {
        gradevalue:''
    }
    handleSubmit =(event)=>{
        console.log('submitted')
        const RateAnswer = new FormData()
        RateAnswer.append('submitted_asignment', this.props['assignmentId'])
        RateAnswer.append('score', this.state.gradevalue)
        fetch('https://serene-wave-21722.herokuapp.com/assignment/grade/create/',{
            method: 'POST',
            body: RateAnswer
        }).then(response=> response.json())
        .then(result=>{
            console.log('success grade:', result)
        }).then(error=>{
            console.log('error grade:', error)
        })
        this.onhideForm()
        event.preventDefault();
    }
    onhideForm =()=>{
        this.props.hideGradeForm()
    }
    onChangeInput=(event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const {gradevalue} = this.state
        console.log('answer iid',this.props['assignmentId'])
        return (
            <form className = "rate-answer-div" onSubmit = {this.handleSubmit}>
                <img src = {cancel_icon} alt = "" onClick = {this.onhideForm}></img>
                <input type = 'text' name = "gradevalue" required value = {gradevalue} onChange = {this.onChangeInput}></input>
                <button type='submit'>Submit</button>
            </form>
        )
    }
}
