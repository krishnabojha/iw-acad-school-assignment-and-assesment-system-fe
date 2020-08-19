import React, { Component } from 'react'
import './SMaterialForm.css'

export default class SMaterialForm extends Component {

    state = {
        file_title: '',
        video_title: '',
        files: '',
        videos: '',
        classid: 5
    }

    handleSubmit = (event) =>{
        console.log('form submited')
        //created object of FormData
        const formData = new FormData();
        // append input data to formdata
        formData.append( 'file_title', this.state.file_title )
        formData.append('video_title', this.state.video_title)
        formData.append('files', this.state.files[0])
        formData.append('videos', this.state.videos[0])
        formData.append('classid', 5)
        /// post formdata to server
        fetch('http://127.0.0.1:8000/data/studymaterial_material_create/',{
            method: 'POST',
            body: formData
        })
        .then((response) => response.json())
        .then((result) => {
        console.log('Success:', result);
        })
        .catch((error) => {
        console.error('Error:', error);
        });   
        event.preventDefault();
        // hide the form after submiting the data
        this.props.onHideForm()
        
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
        console.log('form section', this.state.display)
        // importing the variable form the state
        const {file_title, video_title} = this.state
        return (
            <div className = 'study-entry-form' style = {{display:"inline"}}>
                        <form>
                            <h2>Study material entry form: </h2>
                            <label>Enter File title : </label><br></br>
                            <input type = "text" className = "textinput" name = 'file_title' value = {file_title} onChange = {this.onInputChange}></input><br></br>
                            <label>Enter Video title : </label><br></br>
                            <input type = "text" className = 'textinput' name = 'video_title' value = {video_title} onChange = {this.onInputChange}></input><br></br>
                            <input type = "file" className = 'fileinput' name = 'files' onChange = {this.onInputFilesChange}></input><br></br>
                            <input type = "file" className = 'fileinput' name = 'videos' onChange = {this.onInputFilesChange}></input><br></br>
                            <button type = "submit" className = "btn" onClick = {this.handleSubmit}>Submit</button>
                            <button type = 'submit' className = "btn" onClick = {this.onClickCancel}>Cancel</button>
                        </form>
                    </div>
        )
    }
}
