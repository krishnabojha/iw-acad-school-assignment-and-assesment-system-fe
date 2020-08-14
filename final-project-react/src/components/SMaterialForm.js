import React, { Component } from 'react'
import './SMaterialBlock.css'

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
        fetch('http://127.0.0.1:8000/data/studymaterial_material_create/',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "file_title": this.state.file_title,
                "video_title": this.state.video_title,
                // "files": this.state.files,
                // "videos": this.state.videos,
                "classid": 5
            })
        }).then(function(response){
            console.log(response);
            
        });
        event.preventDefault();
        
    }
    onInputChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
        console.log('this is input', this.state)
    }
    render() {
        console.log('form section', this.state.display)
        const {file_title, video_title, files, videos} = this.state
        return (
            <div className = 'study-entry-form' >
                        <form>
                            <h2>Study material entry form: </h2>
                            <label>Enter File title : </label>
                            <input type = "text" name = 'file_title' value = {file_title} onChange = {this.onInputChange}></input><br></br>
                            <label>Enter Video title : </label>
                            <input type = "text" name = 'video_title' value = {video_title} onChange = {this.onInputChange}></input>
                            Files : <input type = "file" name = 'files' value = {files} onChange = {this.onInputChange}></input>
                            Videos : <input type = "file" name = 'videos' value = {videos} onChange = {this.onInputChange}></input><br></br>
                            <button type = "submit" onClick = {this.handleSubmit}>Submit</button>
                        </form>
                    </div>
        )
    }
}
