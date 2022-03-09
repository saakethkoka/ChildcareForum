import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreatePost.css"


export class CreatePost extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        title: '',
        content: '',
        restricted: false
    };
  }

    handleChangeTitle = (e) =>{
        this.setState({
            title: e.target.value
        })
    }
    handleRestricted = (e) =>{
        this.setState({
            restricted: e.target.checked
        })
    }
    handleChangeContent = (e) =>{
        this.setState({
            content: e.target.value
        })
    }

    // Sending this to the backend here
    onPostSubmit = (event) =>{
        console.log(this.state);
    }

    onCancel = (event) =>{
        console.log("Cancel");
    }

  render() {
    return (
        <form name={"Post"}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" onChange={this.handleChangeTitle}
                   id="title" placeholder="Enter title"/>
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea className="form-control" onChange={this.handleChangeContent}
                      id="content" rows="3" placeholder="Content"/>
          </div>
            <div className="form-group">
                <label htmlFor="Restrict">Restrict Post to followers only</label>
                <input type="checkbox" className="form-check-label" onChange={this.handleRestricted}
                       id="Restrict" placeholder="Enter title"/>
            </div>
            <button type="button" className="btn btn-primary" onClick={this.onPostSubmit}>Post</button>
            <button type="button" className="btn btn-secondary" onClick={this.onCancel}>Cancel</button>
        </form>
    )
  }


}
