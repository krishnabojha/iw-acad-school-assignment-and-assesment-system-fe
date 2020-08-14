import React, { Component } from 'react'

export default class ItemComponent extends Component {
    render() {
        return (
            <a href = {this.props['linkObject']} className = "content-link">
                <div className = 'content' >
                    <img src={this.props['imgsrc']} style = {{paddingLeft:6, paddingRight: 9}} alt = ""/>
                    <div className = "title-container">
                        <h3>{this.props['title']}</h3>
                    </div>
                    <div className = "date-container">
                        <p>September 5</p>
                    </div>
                </div>
                </a>
        )
    }
}
