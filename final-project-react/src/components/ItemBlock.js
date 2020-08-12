import React, { Component } from 'react'
import './SMaterialBlock.css'

export default class ItemBlock extends Component {
    state = {
        data : this.props
    }
    render() {
        this.state.data.map(item =>{
            return (
                <div className = 'content' key = {item.id}>
                    <img src="https://img.icons8.com/cute-clipart/64/000000/file.png" alt = ""/>
                    <div className = "title-container">
                        <h3>{item.file_title}</h3>
                    </div>
                    <div className = "date-container">
                        <p>September 5</p>
                    </div>
                                
                </div>
            )
        })
        return (
            <div className = 'content' >
                <img src="https://img.icons8.com/cute-clipart/64/000000/file.png" alt = ""/>
                <div className = "title-container">
                    <h3>fafdfa</h3>
                </div>
                <div className = "date-container">
                    <p>September 5</p>
                </div>
                            
            </div>
        )
    }
}
