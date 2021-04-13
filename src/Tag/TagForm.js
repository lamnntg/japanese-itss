import React, { Component, useSate } from 'react';

function SubmitForm ({props}) {
    const [state, setState] = useSate( {
        tag: "",
      });
  
      //this.handleChange = this.handleChange.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
    
  
    handleChange= (event)=> {
        const value = event.target.value;
        const name = event.target.name;
        setState({
            [name]: value
        });
    }
  
    handleSubmit= (event) =>{
        props.onAddTag(state)
        setState({
          tag: "",
        })
      event.preventDefault();
    }
  
    
      return (
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="tag" value={this.state.tag} onChange={this.handleChange}  placeholder="tag"/>
          <button type="submit">Add tag</button>
        </form>
      );
    
}

  export default SubmitForm;