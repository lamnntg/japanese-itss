import React, { Component, useState } from "react";
import './FormUpdatePost.css';
import { Tag, Input, Tooltip, Button, Select } from 'antd';

const { Option } = Select;
const children = [];
const defaultTags = [];

function FormUpdatePost(props) {
    const [state, setState] = useState({
        id: -1,
        title: "",
        content: "",
        selectedTag: []
    });

    const searchIndex = (id) => {
      let result = -1;
      props.postLists.forEach((postList, index) => {
        if(postList.id === id) result = index;
      });
      return result;
    }

    const loadData = () => {
      const { postLists } = props;
      children.length = 0;
      defaultTags.length = 0;
      props.tagList.forEach((tag, index) => {
        if(tag!=='All') children.push(<Option key={index} value={tag}>{tag}</Option>);
      });
  
      let index = searchIndex(props.id);
      if(index !== -1) {
        postLists[index].selectedTag.forEach((tag,index) => {
          defaultTags.push(tag);
        });
      };
    }

    loadData();

  const componentDidMount = () => {
    const { postLists } = props;
    let index = searchIndex(props.id);
    if(index !== -1) {
      setState({
        id: props.id,
        title: postLists[index].title,
        // dateCreate: postLists[index].dateCreate,
        content: postLists[index].content,
        selectedTag: postLists[index].selectedTag
      });
    }
  }
 if(state.id == -1) componentDidMount();

  const onCloseFormUpdatePost = (value) => {
    props.closeFormUpdatePost(value);
  };

  const onHandleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setState({
      [name]: value,
    });
    console.log(state.title+" "+state.content);
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();
    props.updatePost(state);
    props.closeFormUpdatePost(false);
  };

  const handleChange = (value) => {
    setState({selectedTag: value});
  }

  const saveUpdate = () => {
    const index = searchIndex(props.id);
    props.postLists[index].title = state.title;
    props.postLists[index].content = state.content;
    props.postLists[index].selectedTag = state.selectedTag;

    console.log(props.postLists[index]);
  }

    return (
     
      <div
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered updatePost" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Form Update Post
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => onCloseFormUpdatePost(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={onHandleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="form-control"
                    placeholder="Enter name"
                    aria-describedby="helpId"
                    onChange={onHandleChange}
                    value={state.title}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="content">Content:</label>
                  <input
                    type="text"
                    name="content"
                    id="content"
                    className="form-control"
                    placeholder="Enter name"
                    aria-describedby="helpId"
                    onChange={onHandleChange}
                    value={state.content}
                  />
                </div>
                <Select
                  size="large" 
                  mode="tags" 
                  style={{ width: '100%' }} 
                  placeholder="Select Tag"    
                  onChange={handleChange}
                  defaultValue={defaultTags}
                >
                    {children}
                  </Select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-dismiss="modal"
                  onClick={() => onCloseFormUpdatePost(false)}
                >
                  Cannel
                </button>
                <button
                  type="submit"
                  className="btn btn-outline-success"
                  onClick={saveUpdate}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }


export default FormUpdatePost;