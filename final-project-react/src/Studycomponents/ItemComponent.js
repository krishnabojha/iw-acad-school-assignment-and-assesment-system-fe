import React, { Component } from 'react'
import './SMaterialBlock.css'
export default class ItemComponent extends Component {
    onShowAssignment =(id)=>{
        this.props.onShowAssignmentPage(id)
    }
    render() {
        const assignment = this.props["assignmentCreate"]
        const showAssignment = this.onShowAssignment
        return (
            <div>
            {
                (assignment === true)?
                <div className = 'content' onClick = {showAssignment.bind(this, this.props['assignmentId'])}>
                    <img src={this.props['imgsrc']} style = {{paddingLeft:6, paddingRight: 9}} alt = ""/>
                    <div className = "title-container">
                        <h3>{this.props['title']}</h3>
                    </div>
                    <div className = "date-container">
                        <p>Due:{this.props['due_time']}</p>
                    </div>
                </div>
                :
                <a href = {this.props['linkObject']} className = "content-link" >
                <div className = 'content' >
                    <img src={this.props['imgsrc']} style = {{paddingLeft:6, paddingRight: 9}} alt = ""/>
                    <div className = "title-container">
                        <h3>{this.props['title']}</h3>
                    </div>
                    <div className = "date-container">
                        <p>{this.props['created_time']}</p>
                    </div>
                </div>
                </a>
            }
            </div>
            
        )
    }
}
