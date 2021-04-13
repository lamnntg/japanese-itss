import React, { Componentm, useSate } from 'react';
import './TagList.css';

function TagListItem ({props}) {
  

    return (
      <div  onClick ={props.onClick}>
        <div className={props.current === this.props.tag ? 'yes' : 'no'} >  {this.props.tag}</div>
      </div>
    );
  
}


export default TagListItem  ;