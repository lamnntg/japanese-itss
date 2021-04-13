import React, {useState} from "react";
// import AddTag from "../addTag";
import { Tag, Input, Tooltip, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const children = [];

function FormCreatePost (props) {
		
	const [state, setState] = useState( {
	  isAddTag: false,
      tmptitle: '',
      tmpcontent: '',
      tmpSelectedTag: []
    })
    

  const loadData = () => {
    children.length = 0;
    props.tagList.forEach((tag, index) => {
      if(tag!=='All') children.push(<Option key={index} value={tag}>{tag}</Option>);
    });
  }

  const handleChange = (value) => {
    setState({tmpSelectedTag: value});
  }
  
  const handleTitleChange = (e) => {
    setState({tmptitle: e.target.value});
  }
 
  const handleContentChange = (e) => {
    setState({tmpcontent: e.target.value});
  }

  const handleSubmit = (e) => {
    const {tmptitle, tmpcontent, tmpSelectedTag} = state;
    e.preventDefault();

    let value = {
      title: tmptitle,
      content: tmpcontent,
      selectedTag: tmpSelectedTag
    }
    props.createPost(value);
    setState({
      isAddTag: false,
      tmpcontent: '',
      tmptitle: '',
      tmpSelectedTag: []
    })
  }  
		return (
			<div
        className="FormCreatePost">
				<div
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Create Post
                </h5>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="name">Title:</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="form-control"
                      placeholder="Enter title"
                      aria-describedby="helpId"
                      onChange={handleTitleChange}
                      value={state.title}
                    />
                    <label htmlFor="name">Content:</label>
                    <textarea
                      type="text"
                      name="content"
                      id="content"
                      className="form-control"
                      placeholder="Enter content"
                      aria-describedby="helpId"
                      onChange={handleContentChange}
                      value={state.content}
                    />
                  </div>
                  <Select size="large" mode="tags" style={{ width: '100%' }} placeholder="Select Tag" onChange={handleChange}>
                    {children}
                  </Select>
                </div>

                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-outline-success"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
			</div>
		);
	
}

export default FormCreatePost;