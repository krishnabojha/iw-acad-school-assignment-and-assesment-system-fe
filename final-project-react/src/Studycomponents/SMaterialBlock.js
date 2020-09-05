import React, { Component } from 'react'
import './SMaterialBlock.css'
import ItemBlock from './ItemBlock';
import ItemComponent from './ItemComponent';

export default class SMaterialBlock extends Component {
    state = {
        study_data : [],
        items: [],
        show: 'all',
        emailobj: '',
        bgcolorall: 'rgb(54, 133, 235)',
        bgcolorfile: '',
        bgcolorvideo: '',
        assignmentCreate: false,

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
            const res = await fetch('https://serene-wave-21722.herokuapp.com/data/studymaterial_material_list/'+this.props['classid']); // fetching the data from api, before the page loaded
            const study_data = await res.json();
            const items = study_data
            this.setState({
                study_data,
                items,
                emailobj: filtered_class[0]  // here the 3 is id of class
            });
        } catch (e) {
            console.log(e);
        }
        console.log('this is email from study material', this.props['classid'])
      }
      // returning only videos when clicked to video btn
      onClickVideos=()=>{
        this.setState({
        items : this.state.study_data.filter(function (item){
            return item.video_title !== ''
        }),

        show: 'video',
        bgcolorvideo: 'rgb(54, 133, 235)',
        bgcolorfile: '',
        bgcolorall: ''
        })
      }
      // returning only files when clicked to files btn
      onClickFiles=()=>{
        this.setState({
            items : this.state.study_data.filter(function (item){
                return item.file_title !== ''
            }),

            show: 'file',
            bgcolorvideo: '',
            bgcolorfile: 'rgb(54, 133, 235)',
            bgcolorall: ''          
        })
      }
    // returning all videos and files when clicked to All btn
      onClickAll=()=>{
        this.setState({
          items : this.state.study_data,
          show: 'all',
          bgcolorvideo: '',
          bgcolorfile: '',
          bgcolorall: 'rgb(54, 133, 235)' 
     })
    }
    render() {
        console.log('SMT', this.state.items)
        return (
            <div className = "outer-div">
                {/* {
                    (this.state.emailobj.email === localStorage.getItem('email'))?
                    <div>
                        <img src="https://img.icons8.com/android/24/000000/link.png" alt = ""/>
                    </div>
                    :<p></p>
                } */}
                <h2 className = "study-material">Study Material</h2>
                <div className = "nav">
                    <button onClick = {this.onClickAll} style = {{backgroundColor: this.state.bgcolorall}}>All</button>
                    <button onClick = {this.onClickFiles} style = {{backgroundColor: this.state.bgcolorfile}}>Files</button>
                    <button onClick = {this.onClickVideos} style = {{backgroundColor: this.state.bgcolorvideo}}>videos</button>
                    <ItemBlock data = {this.state.emailobj} assignmentCreate = {this.state.assignmentCreate}></ItemBlock>
                </div>
                <div className = 'study-content-div'>
                    
                    {
                        this.state.items.reverse().map(studyobject =>{
                            // display content having only videos
                            if (this.state.show === 'video'|| studyobject.file_title === ''){
                                return <ItemComponent linkObject = {studyobject.videos} imgsrc = {'https://img.icons8.com/fluent/48/000000/video.png'} title = {studyobject.video_title} created_time = {studyobject.created_at.split('T')[0]} key = {studyobject.id}></ItemComponent>
                            }
                            // displaying content having only files
                            else if(this.state.show === 'file' || studyobject.video_title === ''){
                                return <ItemComponent linkObject = {studyobject.files} imgsrc = {'https://img.icons8.com/cute-clipart/48/000000/file.png'} title = {studyobject.file_title} created_time = {studyobject.created_at.split('T')[0]} key = {studyobject.id}></ItemComponent>
                            }
                            // displaying content having both files and videos
                            else if(this.state.show ==='all' || (studyobject.video_title !== '' && studyobject.file_title !== '')) {
                                return(
                                    <span key = {studyobject.id}>
                                        <ItemComponent linkObject = {studyobject.videos} imgsrc = {'https://img.icons8.com/fluent/48/000000/video.png'} title = {studyobject.video_title} created_time = {studyobject.created_at.split('T')[0]}></ItemComponent>
                                        <ItemComponent linkObject = {studyobject.files}  imgsrc = {"https://img.icons8.com/cute-clipart/48/000000/file.png"} title = {studyobject.file_title} created_time = {studyobject.created_at.split('T')[0]}></ItemComponent>
                                    </span>       
                                );
                            }
                            else{
                                return <h1>sorry error occured</h1>
                            }
                        })
                    }
                </div>
            </div>
        );
    }
}
