import React, { Component } from 'react'
import '../Authentication/CreateClassForm.css'
import SMaterialBlock from '../Studycomponents/SMaterialBlock'


export default class CreateClassForm extends Component {
    
    render() {
        const classId = this.props['classid']
        console.log('ididid', classId)
        return (
            <div >
                <SMaterialBlock classid = {classId}></SMaterialBlock>
            </div> 
        )
    }
}
