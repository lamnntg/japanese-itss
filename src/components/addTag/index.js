import React, { Component } from "react";
import "./AddTag.css";

function AddTag({props}) {
  const [state, setState] = useState({
    nameTag: "",
  });

 const onCloseFormAddTag = (value) => {
    this.props.closeFormAddTag(value);
  };

 const onHandleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setState({
      [name]: value,
    });
  };

 const onHandleSubmit = (event) => {
    event.preventDefault();
    props.addTag(state.nameTag);
    props.closeFormAddTag(false);
  };

  render() {
    return (
      <div
        className="addTask"
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
                Add Tag
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => this.onCloseFormAddTag(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={this.onHandleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">New Tag:</label>
                  <input
                    type="text"
                    name="nameTag"
                    id="name"
                    className="form-control"
                    placeholder="Enter name"
                    aria-describedby="helpId"
                    onChange={this.onHandleChange}
                    value={this.state.nameTag}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-dismiss="modal"
                  onClick={() => this.onCloseFormAddTag(false)}
                >
                  Cannel
                </button>
                <button
                  type="submit"
                  className="btn btn-outline-success"
                  onClick={this.onAddTag}
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
}

export default AddTag;