import React, { Component } from 'react'
import '../Studycomponents/SMaterialForm.css'

export default class SMaterialForm extends Component {

    state = {
        file_title: '',
        files: '',
        due_time:'',
        classid: 5
    }

    handleSubmit = (event) =>{
        console.log('form submited')
        console.log('this is date',  typeof(this.state.due_time))
        //created object of FormData
        const formData = new FormData();
        // append input data to formdata
        formData.append( 'file_title', this.state.file_title )
        formData.append('files', this.state.files[0])
        formData.append('classid', this.props['myclassid'])
        formData.append('due_date', this.state.due_time)

        if ((this.state.file_title === '')&& (this.state.files === '')){
            alert('you must fill both input fields')
        }
        else{
            /// post formdata to create assignment
        fetch('https://serene-wave-21722.herokuapp.com/assignment/assignmentpdf_create/',{
            method: 'POST',
            body: formData
        })
        .then((response) => response.json())
        .then((result) => {
        console.log('Success: assignment', result);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
        // hide the form after submiting the data
        this.props.onHideForm()
        }
        event.preventDefault();
        
    }
    // taking input data on every change of input
    onInputChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value  //values is used for text
        })
        console.log('this is input', this.state)
    }
    // storing file and video to the variable  
    onInputFilesChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.files //.files is used for files
        })
    }
    // cancel the form display
    onClickCancel = () =>{
        this.props.onHideForm()
    }
    render() {
        // console.log('form section', this.state.display)
        console.log('this is class id ', this.props['myclassid'])
        // importing the variable form the state
        const {file_title, due_time} = this.state
        return (
            <div className = 'assignment-entry-form' style = {{display:"inline"}}>
                        <form>
                            <h2>Create Assignment: </h2>
                            <label className = 'label'>Enter Question title : </label><br></br>
                            <input type = "text" className = "textinput" name = 'file_title' value = {file_title} onChange = {this.onInputChange}></input><br></br>
                            <label className = 'label'>Upload file:</label>
                            <input type = "file" className = 'assignmentfileinput' name = 'files' onChange = {this.onInputFilesChange}></input><br></br>
                            <label className = 'label'>Due Time:</label><br></br>
                            <input type = "date" className = "textinput" name = 'due_time' value = {due_time} onChange = {this.onInputChange}></input>
                            <button type = "submit" className = "btn" onClick = {this.handleSubmit}>Submit</button>
                            <button type = 'submit' className = "btn" onClick = {this.onClickCancel}>Cancel</button>
                        </form>
                    </div>
        )
    }
}
