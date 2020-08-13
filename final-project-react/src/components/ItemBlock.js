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
        console.log('image clicked',this.displayform)
    }
    render() {
        console.log('class email id ', this.props['data'])
        if (this.state.myemail === this.props['data']) {
            return (
                <span>
                    <img src="https://img.icons8.com/flat_round/50/000000/plus.png" onClick = {() => this.onClickAdd()} alt = ""/>
                    <SMaterialForm displayform = {this.state.displayform}></SMaterialForm>
                </span>
                
            )
        }
        else {
            return <p></p>
        }
    }
}
