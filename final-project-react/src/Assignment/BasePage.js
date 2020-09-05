import React, { Component } from 'react'
import './BasePage.css'
import '../Studycomponents/SMaterialBlock.css'
import ItemBlock from '../Studycomponents/ItemBlock';
import ItemComponent from '../Studycomponents/ItemComponent';
import AssignmentPage from './AssignmentPage';
import CheckAnswer from './CheckAnswer';

export default class BasePage extends Component {
    state = {
        items: [],
        emailobj: '',
        assignmentCreate: true,
        showassignmentpage: false,
        assignment_id:''
    };
    async componentDidMount() {
        try {
            // fetching the list of created class
            const rooms = await fetch('https://serene-wave-21722.herokuapp.com/data/studymaterial_class_list')
            const class_data = await rooms.json();
            // console.log('this is class data', class_data)
            const class_id = this.props['classid']
            const filtered_class = class_data.filter(function(item){return item.id === class_id})
            console.log('this is email', filtered_class[0].email)
            // fetching the list of study material of respective id
            const res = await fetch('https://serene-wave-21722.herokuapp.com/assignment/assignmentpdf_list/'+this.props['classid']); // fetching the data from api, before the page loaded
            const study_data = await res.json();
            const items = study_data
            console.log('assignment obj', study_data)
            this.setState({
                // study_data,
                items,
                emailobj: filtered_class[0] 
            });
        } catch (e) {
            console.log(e);
        }
        console.log('this is id of current user', this.props['classid'])
        console.log('this is assignment list', this.state.items)
      }
     onShowAssignmentPage =(Id)=>{
         console.log('this is id in base page.',Id)
         this.setState({
             assignment_id: Id,
             showassignmentpage: true
         })
     }
     onHideAssignmentPage =()=>{
         this.setState({
             showassignmentpage:false
         })
     }
    render() {
        return (
            <div className = "assignment-div">
                <h2 className = "assignment-header">Assignment</h2>
                <div className = "assignment-nav">
                    <ItemBlock data = {this.state.emailobj} assignmentCreate = {this.state.assignmentCreate} ></ItemBlock>
                </div>
                <div className = 'assignment-content-div'>
                    
                    {
                        this.state.items.reverse().map(Assignmentobject =>{
                            // display content having only videos
                                return <ItemComponent onShowAssignmentPage = {this.onShowAssignmentPage} assignmentCreate = {this.state.assignmentCreate} linkObject = {Assignmentobject.videos} imgsrc = {'https://img.icons8.com/fluent/48/000000/task.png'} title = {Assignmentobject.file_title} due_time = {Assignmentobject.due_date} assignmentId = {Assignmentobject} key = {Assignmentobject.id}></ItemComponent>
                        })
                    }
                </div>
                <div className = "assignmentpage">
                {
                    (this.state.showassignmentpage === true && (this.state.emailobj !== localStorage.getItem('email')))?
                        (this.state.emailobj.email === localStorage.getItem('email'))?
                            <CheckAnswer assignment = {this.state.assignment_id} assignmentPage = {this.onHideAssignmentPage}></CheckAnswer>
                            :<AssignmentPage assignment = {this.state.assignment_id} assignmentPage = {this.onHideAssignmentPage}></AssignmentPage>
                    :<p></p>
                }
                </div>
                
            </div>
        );
    }
}
