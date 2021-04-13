import React, { Component } from 'react';
import { Menu } from 'antd';
import  FormCreatePost from '../formCreatePost';
import {
  EditOutlined,
  GitlabOutlined,
} from '@ant-design/icons';

class NavBar extends Component {
  
  state = {
    isOpen:false
  }
  openCreatePost = ()=>{
    return
  }
  
  render() {
    return (
      <div>
      <Menu theme="light" onClick={this.props.onClickChangePage} selectedKeys={[this.props.currentPage]} mode="horizontal" style={{ position: 'fixed', zIndex: 1, width: '100%', height: 50 }}>
        <Menu.Item key="index"><GitlabOutlined />My Blog</Menu.Item>
        <Menu.Item key="create" style={{float: 'right'}} onClick ={()=>{this.setState({isOpen:true})} }><EditOutlined />Create Post</Menu.Item>
      </Menu>
      {this.state.isOpen&&this.openCreatePost()}
      </div>
    );
  }
}

export default NavBar; 

