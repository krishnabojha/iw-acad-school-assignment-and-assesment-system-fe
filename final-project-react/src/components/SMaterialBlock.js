import React, { Component } from 'react'
import './SMaterialBlock.css'
// import ItemBlock from './ItemBlock';

export default class SMaterialBlock extends Component {
    state = {
        study_data : [],
        items: [],
        show: 'all'

    };
    async componentDidMount() {
        try {
          const res = await fetch('http://127.0.0.1:8000/data/studymaterial_material_list/5'); // fetching the data from api, before the page loaded
          const study_data = await res.json();
          const items = study_data
          this.setState({
            study_data,
            items
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
          items : this.state.study_data
        })
    }
    render() {
        // let files = this.state.study_data.filter(function(item){
        //     return item.file_title !== ''
        // });
        // let videos = this.state.study_data.filter(function (item){
        //     return item.video_title !== ''
        // });
        // this.state.items.map( abc =>(
        //     console.log(abc.file_title)
        // ))
        // console.log('this is value ', this.state.items)
        return (
            <div className = "outer-div">
                <h2 className = "study-material">Study Material</h2>
                <div className = "nav">
                    <button onClick = {this.onClickAll}>All</button>
                    <button onClick = {this.onClickFiles}>Files</button>
                    <button onClick = {this.onClickVideos}>videos</button>
                </div>
                <div className = 'study-content-div'>

                    {/* <ItemBlock data = {this.state.items} ></ItemBlock> */}
                    
                    {
                        this.state.items.map(studyobject =>{
                            if (this.state.show === 'video'){
                                return(
                                    <div className = 'content' key = {studyobject.id}>
                                        {/* <img src="https://img.icons8.com/cute-clipart/64/000000/file.png" alt = ""/> */}
                                        <img src="https://img.icons8.com/fluent/48/000000/video.png" alt = ""/>
                                        <div className = "title-container">
                                            <h3>{studyobject.video_title}</h3>
                                        </div>
                                        <div className = "date-container">
                                            <p>September 5</p>
                                        </div>
                                    
                                    </div>
                                );
                            }
                            else if(this.state.show === 'files'){
                                return(
                                    <div className = 'content' key = {studyobject.id}>
                                        <img src="https://img.icons8.com/cute-clipart/64/000000/file.png" alt = ""/>
                                        {/* <img src="https://img.icons8.com/fluent/48/000000/video.png" alt = ""/> */}
                                        <div className = "title-container">
                                            <h3>{studyobject.video_title}</h3>
                                        </div>
                                        <div className = "date-container">
                                            <p>September 5</p>
                                        </div>
                                    
                                    </div>
                                );
                            }
                            else {
                                return(
                                    <div className = 'content' key = {studyobject.id}>
                                        <img src="https://img.icons8.com/cute-clipart/64/000000/file.png" alt = ""/>
                                        {/* <img src="https://img.icons8.com/fluent/48/000000/video.png" alt = ""/> */}
                                        <div className = "title-container">
                                            <h3>{studyobject.video_title}</h3>
                                        </div>
                                        <div className = "date-container">
                                            <p>September 5</p>
                                        </div>
                                    
                                    </div>
                                );
                            }
                        })
                    }

                    {/* {
                        this.state.items.map(studyobject =>(

                            <div className = 'content' key = {studyobject.id}>
                            <img src="https://img.icons8.com/cute-clipart/64/000000/file.png" alt = ""/>
                            <div className = "title-container">
                                <h3>{studyobject.video_title}</h3>
                            </div>
                            <div className = "date-container">
                                <p>September 5</p>
                            </div>
                            
                    </div>

                        ))
                    } */}

                </div>
            </div>
        );
    }
}
