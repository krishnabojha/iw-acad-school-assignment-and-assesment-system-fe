import React, { Component } from 'react'
import '../Authentication/CreateClassForm.css'
import SMaterialBlock from '../Studycomponents/SMaterialBlock'


export default class ShowClassItem extends Component {
    
    render() {
        const classId = this.props['classid']
        console.log('Class id : ', classId)
        return (
            <div >
                <SMaterialBlock classid = {classId}></SMaterialBlock>
            </div> 
        )
    }
}
