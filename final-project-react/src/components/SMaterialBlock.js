import React, { Component } from 'react'

export default class SMaterialBlock extends Component {
    state = {
        study_data : []
    };
    async componentDidMount() {
        try {
          const res = await fetch('http://127.0.0.1:8000/data/studymaterial_class_list/'); // fetching the data from api, before the page loaded
          const study_data = await res.json();
          console.log(study_data)
          this.setState({
            study_data
          });
        } catch (e) {
          console.log(e);
        }
      }
    render() {
        return (
            <div>
                <h1>Created ClassRoom</h1>
                <hr></hr>
                {
                    this.state.study_data.map(item =>(
                        <div key = {item.id}>
                            <h2>class name : {item.classname}</h2>
                            <h2>email : {item.email}</h2>
                            <h2>Created_at : {item.created_at}</h2>
                            <hr></hr>
                        </div>
                    ))
                }
            </div>
        );
    }
}
