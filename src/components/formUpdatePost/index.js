import React, { Component, useState ,useEffect} from "react";
import './FormUpdatePost.css';
import { Tag, Input, Tooltip, Button, Select } from 'antd';

const { Option } = Select;
function FormUpdatePost(props) {
    const [state, setState] = useState({
        id: -1,
        title: "",
        content: "",
        selectedTag: []
    });
    const [children,setChildren]= useState([])  
    const [defaultTags,setDefaultTags]= useState([])  
  const searchIndex = (id) => {
    let result = -1;
    props.postLists.forEach((postList, index) => {
      if(postList.id === id) result = index;
    });
    return result;
  }

  useEffect(() => {
    const { postLists } = props;
    console.log(props);
    let index = searchIndex(props.id);
    loadData()
    if(index !== -1) {
      setState({
        id: index + 1,
        title: postLists[index].title,
        // dateCreate: postLists[index].dateCreate,
        content: postLists[index].content,
        selectedTag: postLists[index].selectedTag,
      });
    }},[])

  const onCloseFormUpdatePost = (value) => {
    props.closeFormUpdatePost(value);
  };

  const onHandleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setState({
      ...state,
      [name]: value,
    });
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();
    props.updatePost(state);
    props.closeFormUpdatePost(false);
  };

  const loadData = () => {
    const { postLists } = props;
    let result;
    result= props.tagList.map((tag, index) => {
      if(tag!=='All') {return <Option key={index} value={tag}>{tag}</Option>};
    });
    setChildren(result)
    let index = searchIndex(props.id);
    let result2=[]
  }
  // console.log(props);

  const handleChange = (value) => {
    setState({
      ...state,
      selectedTag: value});
  }
  // console.log(state);

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
                  <textarea
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
                  value={state.selectedTag}
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