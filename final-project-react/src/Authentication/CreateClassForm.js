import React, { Component } from 'react'
import '../Authentication/CreateClassForm.css'

export default class CreateClassForm extends Component {
    render() {
        return (
            <div>
                
                <div className = 'create-class-form'>
                    <input type = 'text' placeholder = 'Enter name of new Class'></input>
                </div>
            </div> 
        )
    }
}
