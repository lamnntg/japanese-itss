import React, { Component, useSate } from 'react';
import TagListItem from "./TagList.js"
import SubmitForm from "./TagForm.js"
import './App.css';

function App ({props}) {
  const [state, setState] = useSate({
      taglist : [
        {
          tag: "#comedy",
        },
        {
          tag: "#la",
        }
      ],
      current: null
    })
    //this.MarkCurrent = this.MarkCurrent.bind(this);
    //this.handleAddTag = this.handleAddTag.bind(this);
  

  handleAddTag = (item) => {
    state.taglist.push(item);
    setState({ taglist: state.taglist });
  };

  MarkCurrent = (index) => {
    state.current = state.taglist[index]
    setState({ taglist: state.taglist });
    setState({ current: state.current });
  };
  

  
    let items = state.taglist.map((item, index) => {
      let result = ""
      if (item) {
        result = <TagListItem
                  key={index}
                  tag={item.tag}
                  onClick={() => this.MarkCurrent(index)}
                />
      }

      return result
    })
    return (
      <div className="App">
        <div className="App-form">
          <SubmitForm
           onAddTag={this.handleAddTag}

          />
        </div>
        <div>
          {items}
        </div>
      </div>
    );
}


export default App;