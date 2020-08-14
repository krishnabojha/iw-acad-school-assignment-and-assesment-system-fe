import React, { Component } from 'react'
import './SMaterialBlock.css'
import SMaterialForm from './SMaterialForm'

export default class ItemBlock extends Component {
    state = {
        myemail: 'baba@baba.com',
        displayform: 'none',
    }
    onClickAdd=()=>{
        this.setState({
            displayform: 'inline',
        })
        console.log('image clicked',this.state.displayform)
    }
    render() {
        console.log('class email id ', this.props['data'])
            return (
                <span>
                {
                    (this.state.myemail === this.props['data'])
                    ? <span>
                    <img src="https://img.icons8.com/flat_round/50/000000/plus.png" onClick = {() => this.onClickAdd()} alt = ""/>
                    {
                        (this.state.displayform === 'inline')
                        ? <SMaterialForm displayform = {this.state.displayform}></SMaterialForm>
                        : <p></p>
                    }
                    
                    </span>
                    : <h1>sorry</h1>
                }
                </span>
                
            )
    }
}
