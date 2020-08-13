import React, { Component } from 'react'
import './SMaterialBlock.css'
import ItemBlock from './ItemBlock';

export default class SMaterialBlock extends Component {
    state = {
        study_data : [],
        items: [],
        show: 'all',
        email: ''

    };
    async componentDidMount() {
        try {
            const rooms = await fetch('http://127.0.0.1:8000/data/studymaterial_class_list')
            const class_data = await rooms.json();
            // console.log(class_data[3].email)

          const res = await fetch('http://127.0.0.1:8000/data/studymaterial_material_list/5'); // fetching the data from api, before the page loaded
          const study_data = await res.json();
          const items = study_data
          this.setState({
            study_data,
            items,
            email: class_data[3].email  // here the 3 is id of class
          });
        } catch (e) {
          console.log(e);
        }
      }

      onClickVideos=()=>{
          this.setState({
            items : this.state.study_data.filter(function (item){
                return item.video_title !== ''
            }),

            show: 'video'
          })
      }

      onClickFiles=()=>{
          this.setState({
              items : this.state.study_data.filter(function (item){
                  return item.file_title !== ''
              }),

              show: 'file'
          })
      }

      onClickAll=()=>{
        this.setState({
          items : this.state.study_data,
          show: 'all'
        })
    }
    render() {
        
        return (
            <div className = "outer-div">
                <h2 className = "study-material">Study Material</h2>
                <div className = "nav">
                    <button onClick = {this.onClickAll}>All</button>
                    <button onClick = {this.onClickFiles}>Files</button>
                    <button onClick = {this.onClickVideos}>videos</button>
                    <ItemBlock data = {this.state.email} ></ItemBlock>
                </div>
                <div className = 'study-content-div'>
                    
                    {
                        this.state.items.map(studyobject =>{
                            if (this.state.show === 'video'|| studyobject.file_title === ''){
                                return(
                                    <a href = {studyobject.videos} className = "content-link">
                                    <div className = 'content' key = {studyobject.id}>
                                        <img src="https://img.icons8.com/fluent/48/000000/video.png" style = {{paddingLeft:6, paddingRight: 9}} alt = ""/>
                                        <div className = "title-container">
                                            <h3>{studyobject.video_title}</h3>
                                        </div>
                                        <div className = "date-container">
                                            <p>September 5</p>
                                        </div>
                                    </div>
                                    </a>
                                );
                            }
                            else if(this.state.show === 'file' || studyobject.video_title === ''){
                                return(
                                    <a href = {studyobject.files} className = "content-link">
                                    <div className = 'content' key = {studyobject.id}>
                                        <img src="https://img.icons8.com/cute-clipart/64/000000/file.png" alt = ""/>
                                        <div className = "title-container">
                                            <h3>{studyobject.file_title}</h3>
                                        </div>
                                        <div className = "date-container">
                                            <p>September 5</p>
                                        </div>
                                    </div>
                                    </a>
                                );
                            }
                            else if(this.state.show ==='all' || (studyobject.video_title !== '' && studyobject.file_title !== '')) {
                                  
                                        return(
                                            <span>
                                                <a href = {studyobject.videos} className = "content-link">
                                                    <div className = 'content' key = {studyobject.id}>
                                                        <img src="https://img.icons8.com/fluent/48/000000/video.png" style = {{paddingLeft:6, paddingRight: 9}} alt = ""/>
                                                        <div className = "title-container">
                                                        <h3>{studyobject.video_title}</h3>
                                                        </div>
                                                        <div className = "date-container">
                                                            <p>September 5</p>
                                                        </div>
                                                    
                                                    </div>
                                            </a>
                                            <a href = {studyobject.files} className = "content-link">
                                                <div className = 'content' key = {studyobject.id}>
                                                    <img src="https://img.icons8.com/cute-clipart/64/000000/file.png" alt = ""/>
                                                    <div className = "title-container">
                                                        <h3>{studyobject.file_title}</h3>
                                                    </div>
                                                    <div className = "date-container">
                                                        <p>September 5</p>
                                                    </div>
                                                
                                                </div>
                                            </a>
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
