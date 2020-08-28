import React, { Component } from 'react'
import './SMaterialBlock.css'
import SMaterialForm from './SMaterialForm'

export default class ItemBlock extends Component {
    state = {
        myemail: '',
        displayform: false,
    }
    componentDidMount(){
        this.setState({
            myemail: localStorage.getItem('email')
        })
    }
    // display a form when clicked
    onClickAdd=()=>{
        this.setState({
            displayform: true,
        })
        console.log('image clicked',this.state.displayform)
    }
    // hide the form when clicked
    onHideForm = () =>{
        this.setState({
            displayform: false
        })
    }
    render() {
        const myclassObj = this.props['data']
        // console.log('this is user email', this.state.myemail)
        // console.log('my class email id ', myclassObj['email'])
            return (
                <span>
                {
                    (this.state.myemail === myclassObj['email'])
                    ? <span>
                    <img src="https://img.icons8.com/flat_round/50/000000/plus.png" onClick = {() => this.onClickAdd()} alt = ""/>
                    {
                        (this.state.displayform === true)
                        ? <SMaterialForm onHideForm = {this.onHideForm} myclassid = {myclassObj['id']}></SMaterialForm>
                        : <p></p>
                    }
                    
                    </span>
                    : <h2>Empty</h2>
                }
                </span>
                
            )
    }
}
