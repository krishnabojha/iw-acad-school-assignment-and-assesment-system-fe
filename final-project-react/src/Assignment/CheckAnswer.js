import React, { Component } from 'react'
import cancel_icon from '../images/cancel_icons.png'
import './AssignmentCheck.css'
import RateAssignment from './RateAssignment'

export default class CheckAnswer extends Component {
    state = {
        StudentAnswer: [],
        rateAnswer:false,
        assignmentsubmitid: '',
        scorelist:''
    }
    async componentDidMount(){
        try{
            // fetching submitted answer and filtering for the clicked question
            const Answer = await fetch('https://serene-wave-21722.herokuapp.com/assignment/assignmentsubmit/list/')
            const studentAnswer = await Answer.json()
            const Assignmentid = this.props['assignment'].id
            console.log('question id: ', typeof(studentAnswer[0]['assignment_id'].id))
            const filtered_Answer = studentAnswer.filter(function(item){return item['assignment_id'].id === Assignmentid})
            
            ////fetching grade list to check whether the answer is rated or not
            const ScoreList = await (await fetch('https://serene-wave-21722.herokuapp.com/assignment/grade/list/')).json()
            console.log('this is grade list:', ScoreList)
            this.setState({
                StudentAnswer: filtered_Answer,
                scorelist:ScoreList,
            })
        }
        catch(error){
            console.log('error fetching answer:', error)
        }
        
    }
    /// deleting assignment
    onDeleteAssignment=(event)=>{
        console.log('deleted')
        fetch('https://serene-wave-21722.herokuapp.com/assignment/assignmentpdf_delete/'+this.props['assignment'].id,{
            method:'DELETE'
        }).then(response => response.json())
        .then(result=>{
            console.log('success:', result)
        }).then(error=>{
            console.log('error: ', error)
        })
        event.preventDefault();
        window.location.reload()
    }
    onHideAnswerForm =()=>{
        this.props.assignmentPage()
    }
    // rate the answer
    onRateAnswer=(AnswerObj)=>{
        if(this.state.rateAnswer === false){
            this.setState({
                rateAnswer: true,
                assignmentsubmitid: AnswerObj.id,

            })
        }
        else{
            this.setState({
                rateAnswer:false,
            })
        }
    }
    hideGradeField = ()=>{
        if(this.state.rateAnswer === false){
            this.setState({
                rateAnswer: true,
            })
        }
        else{
            this.setState({
                rateAnswer:false,
            })
        }
    }
    render() {
        const {scorelist} = this.state
        return (
            <div className = "assignmentCheck-page">
                <img className = "cancel-assignmentCheck" src = {cancel_icon} alt = "" onClick = {this.onHideAnswerForm}></img>
                <div className = "assignmentCheckform">
                    <h3 className = 'questionCheck'>Title:</h3>
                    <input type = "text" className = "questionCheck-field" disabled value = {this.props['assignment'].file_title}></input>
                    <a href = {this.props['assignment'].files}>
                    <img className = "delete-assignment" title = "Delete this Assignment" src="https://img.icons8.com/carbon-copy/100/000000/delete-forever--v1.png" onClick = {this.onDeleteAssignment} alt="" />
                    <div className = "pdf-fileCheck">
                        <img src = 'https://img.icons8.com/fluent/48/000000/task.png' alt = ""></img>
                        <span className = 'questionCheck-message'>Click to see Questions</span>
                    </div></a>
                    <h3 className ="due_dateCheck">Due: {this.props['assignment'].due_date}</h3><br></br>
                    <h3>Submitted Answer:</h3>
                    <div className="StudentAnswer-div">
                        {
                            this.state.StudentAnswer.map(item=>{
                                console.log(item['submitter'].username)
                                return(
                                    
                                    <div className = 'myAnswer' key = {item.id}>
                                        <a href = {item.files}>
                                            <img src="https://img.icons8.com/fluent/48/000000/assignment-turned-in.png" alt=""/>
                                            <p className = "studentName">{item['submitter'].username}</p>
                                        </a>
                                        {
                                            (scorelist.filter(function(data){return((item['assignment_id'].id === data["submitted_asignment"].assignment_id)&&(item["submitter"].id === data['submitted_asignment'].submitter))})[0] === undefined)?
                                            <span className = "rateAnswer" onClick = {this.onRateAnswer.bind(this,item)} >Rate Answer</span>
                                            : <span className = "rateAnswer" onClick = {this.onRateAnswer.bind(this,item)} >Rated Answer</span>

                                        }
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </div>
                <div>
                        {
                            (this.state.rateAnswer === true)?
                            <RateAssignment assignmentId = {this.state.assignmentsubmitid} hideGradeForm = {this.hideGradeField}></RateAssignment>
                            :<p></p>
                        }
                    </div>
            </div>
        )
    }
}
