import React, { Component } from 'react'
import '../Authentication/CreateClassForm.css'
import SMaterialBlock from '../Studycomponents/SMaterialBlock'
import BasePage from '../Assignment/BasePage'


export default class ShowClassItem extends Component {
    
    render() {
        const classId = this.props['classid']
        console.log('Class id : ', classId)
        return (
            <div className = 'basePage-div'>
                <div className = 'studyMaterial-block'>
                    <SMaterialBlock classid = {classId}></SMaterialBlock>
                </div>
                <div className = 'assignment-block'>
                    <BasePage classid = {classId}></BasePage>
                </div>
            </div> 
        )
    }
}
