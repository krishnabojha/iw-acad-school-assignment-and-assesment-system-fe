import React, { Component } from 'react'
import './AssignmentPage.css'
import cancel_icon from '../images/cancel_icons.png'

export default class AssignmentPage extends Component {
    state = {
        answer:'',
        ScorePoint: '',
        AnswerDone: false,
    }
    async componentDidMount(){
        try{
            //Fetching all list of gradded assignment
            const grades = await fetch('https://serene-wave-21722.herokuapp.com/assignment/grade/list/');
            const gradelist = await grades.json();
            // console.log('this is start',(gradelist[0]['submitted_asignment'].assignment_id))
            const QuestionId = this.props['assignment'].id
            const mygrade = gradelist.filter(function(item){return ((item['submitted_asignment'].assignment_id === QuestionId)&&(parseInt(localStorage.getItem('UserId')) === item['submitted_asignment'].submitter))})
            // console.log('your grade is', mygrade)

            /// Fetching submitted assignment list to check whether the asnwer is submited or not
            const CheckSubmit = await (await fetch('https://serene-wave-21722.herokuapp.com/assignment/assignmentsubmit/list/')).json()
            const SubmittedAnswer = CheckSubmit.filter(function(item){return((item["assignment_id"].id === QuestionId)&&(parseInt(localStorage.getItem('UserId'))=== item["submitter"].id))})
            // console.log('Answered User info:', SubmittedAnswer[0])
            if(SubmittedAnswer[0] !== undefined){
                this.setState({
                    AnswerDone: true
                })
            }
            this.setState({
                ScorePoint: mygrade[0].score
            })
        }
        catch(error){
            console.log('error in grade list: ',error)
        }
    }
    //// submit answer of the question
    handleSubmitAnswer=()=>{
        const submitdata = new FormData()
        submitdata.append('assignment_id', this.props['assignment'].id)
        submitdata.append('submitter', localStorage.getItem('UserId'))
        submitdata.append('files', this.state.answer[0])
        fetch('https://serene-wave-21722.herokuapp.com/assignment/assignmentsubmit/create/',{
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
    // importing files from device
    onImportFile =(event)=>{
        this.setState({
            [event.target.name]: event.target.files
        })
    }
    HidePage =()=>{
        this.props.assignmentPage()
    }
    render() {
        console.log('this is score', this.state.ScorePoint)
        return (
            <div className = "assignment-page">
                <img className = "cancel-assignment" src = {cancel_icon} alt = "" onClick = {this.HidePage}></img>
                <div className = "assignmentform">
                    <h3 className = 'question'>Question:</h3>
                    <input type = "text" className = "question-field" disabled value = {this.props['assignment'].file_title}></input>
                    <h3 className ="due_date">Due date: {this.props['assignment'].due_date}</h3><br></br>
                    <h3>File:</h3>
                    {
                        (this.state.AnswerDone === true)?
                        <img className = "done-tick" src="https://img.icons8.com/flat_round/64/000000/checkmark.png" alt ="" />
                        :<p></p>
                    }
                    <a href = {this.props['assignment'].files}>
                    <div className = "pdf-file">
                        <img src = 'https://img.icons8.com/fluent/48/000000/task.png' alt = ""></img>
                        <span className = 'question-message'>Click to see Questions</span>
                    </div></a><br></br>
                    <h3>Submit Answer:</h3>
                    <input type = "file" name="answer" onChange={this.onImportFile}></input>
                    <span className = "grade">Score: {this.state.ScorePoint}</span><br></br>
                    <button className = "submit-assignment" onClick = {this.handleSubmitAnswer}>Submit</button>
                </div>
            </div>
        )
    }
}
