import React, { Component } from 'react'
import './SMaterialBlock.css'

export default class SMaterialForm extends Component {
    state = {
        displayform: this.props['displayform'],
    }
    render() {
        console.log('form section', this.state.displayform)
        return (
            <div className = 'study-entry-form' style = {{display: this.state.displayform}}>
                        <form>
                            <h2>Study material entry form: </h2>
                            <label>Enter File title : </label>
                            <input type = "text"></input><br></br>
                            <label>Enter Video title : </label>
                            <input type = "text"></input>
                            <input type = "file"></input>
                            <input type = "file"></input><br></br>
                            <button type = "submit">Submit</button>
                        </form>
                    </div>
        )
    }
}
