import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import FormUpdatePost from "./components/formUpdatePost/";
import FormCreatePost from "./components/formCreatePost/index";
import ListPost from "./components/layout/ListPost";
import TagList from "./components/layout/TagList";
import NavBar from "./components/layout/NavBar";
import 'antd/dist/antd.css';
import { Layout, Menu, Carousel, Avatar, Row, Col, Tag } from 'antd';

function App() {
  const exampleContent1 = ["If you’re thinking of starting your very own blog, but just don’t have a clue on what to blog about, then fear not!"];
  const exampleContent2 = ["If you’re thinking of starting your very own blog, but just don’t have a clue on what to blog about, then fear not!"];
  const exampleContent3 = ["If you’re thinking of starting your very own blog, but just don’t have a clue on what to blog about, then fear not!"];
  const exampleContent4 = ["If you’re thinking of starting your very own blog, but just don’t have a clue on what to blog about, then fear not!"];
  const dateFormat = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
  const { Header, Content, Footer } = Layout;
  const [filterTagList, setFilterTagList] = useState(["All"]);
  const [tagList, setTagList] = useState(["All","React","Blockchain","PHP","BrSE","AI"])
  const [isUpdatePost, setIsUpdatePost] = useState(false);
  const [isCreatePost, setIsCreatePost] = useState(true);
  const [userInfo, setUserInfo] = useState({
    name: "Group 2",
    age: 18,
    position: "Student",
    company: "Hanoi University of Science & Technology",
    technology: "Python, NodeJS, ReactJS",
    hobby: "Reading Books, Travel"
  })
  const [currentPage, setCurrentPage] = useState(['index']);
  const [idUpdatePost,setIdUpdatePost] = useState(0);
  const [postLists, setPostLists] = useState ([
    {
      id: 1,
      title: "Master AI in 2 hours",
      dateCreate: new Date('April 11, 2021 03:24:00').toLocaleString('ja-JP',dateFormat),
      content: exampleContent1,
      selectedTag: ["AI"],
    },
    {
      id: 2,
      title: "Become BrSE - A bright future for developer",
      dateCreate: new Date('April 12, 2021 09:40:00').toLocaleString('ja-JP',dateFormat),
      content: exampleContent2,
      selectedTag: ["React","BrSE"],
    },
    {
      id: 3,
      title: "PHP in a nutshell",
      dateCreate: new Date('April 13, 2021 08:24:00').toLocaleString('ja-JP',dateFormat),
      content: exampleContent3,
      selectedTag: ["Blockchain","PHP"],
    },
    {
      id: 4,
      title: "Deep Learning for beginner",
      dateCreate: new Date('April 14, 2021 09:14:00').toLocaleString('ja-JP',dateFormat),
      content: exampleContent4,
      selectedTag: ["AI","BrSE"],
    },
  ])

  const handleCloseFormUpdatePost = (value) => {
    setIsUpdatePost(value);
  };

  const onToggleFormUpdatePost = () => {
    let result = null;
    isUpdatePost
      ? (result = (
          <FormUpdatePost
            closeFormUpdatePost={handleCloseFormUpdatePost}
            updatePost={handleUpdatePost}
            id={idUpdatePost}
            postLists={postLists}
            tagList={tagList}
          />
        ))
      : (result = "");
    return result;
  };

  const renderPostList = (filterTagList) => {
    let renderPostList = [];
    if (filterTagList.length == 1 && filterTagList[0] == "All") {
      renderPostList = postLists;
    } else {
      renderPostList = postLists.filter(post => (post.selectedTag.filter((tag) => filterTagList.includes(tag)).length > 0));
    }
    renderPostList = renderPostList.slice().sort((a, b) => b.dateCreate - a.dateCreate)
    return (renderPostList.map((post,index) => (
      <ListPost
        key={index}
        post={post}
        createPost={(value1, value2) => {
          // console.log(value1,value2);
          setIsCreatePost(value1);
          setIsUpdatePost(value2);
          setIdUpdatePost(value2)
        }}
        onClick={() => deletePost(post)}
      />
  )));
  }
  
  const deletePost = (value) => {
    const newData = postLists.filter((post) => post!==value);
    setPostLists(newData);
  }

  const searchIndex = (id) => {
    let result = -1;
    postLists.forEach((postList, index) => {
      if (postList.id === id) result = index;
    });
    return result;
  };

  const handleUpdatePost = (value) => {
    let abc=postLists
    let index = abc.findIndex(value1=>value1.id===value.id);
    abc[index]={
      id: value.id,
      title: value.title,
      dateCreate: new Date().toLocaleString('ja-JP',dateFormat),
      content: value.content,
      selectedTag: value.selectedTag
    }
    // console.log(postLists);
    if (index !== -1) {
      setPostLists(
         abc
      );
    }
  }; 
  const handleChangeFilterTag = (tag, checked) => {
    let nextSelectedTags = [];
    if (checked && tag === "All") {
      nextSelectedTags = ["All"];
    } 
    else if (checked && tag !== "All") {
      let temp = filterTagList.filter(t => t !== "All");
      nextSelectedTags = [...temp, tag];
    } 
    else {
      nextSelectedTags = filterTagList.filter(t => t !== tag);
    }
    if (nextSelectedTags.length == 0) {
      nextSelectedTags = ["All"];
    }
    setFilterTagList(nextSelectedTags);
  }
  
  const findMaxIndex = () => {
    let idArray = postLists.map(post => post.id);
    return Math.max(...idArray);
  }

  const handleCreatePost = (value) => {
    let newTagList = [...new Set([...tagList, ...value.selectedTag])];
    let index = findMaxIndex();
    const newData = postLists.concat([{
      id: index + 1,
      title: value.title,
      dateCreate: new Date().toLocaleString('ja-JP',dateFormat),
      content: value.content,
      selectedTag: value.selectedTag,
    }]);

    setPostLists(newData);
    setTagList(newTagList);
    setCurrentPage('index');
  };
  const onClickChangePage = e => {
    setCurrentPage(e.key);
  };
  return (
    <Layout className="layout" style={{background: "#fff"}}> 
        <NavBar
            currentPage = {currentPage}
            onClickChangePage = {onClickChangePage}
        />
        {currentPage == 'index' ? 
          <>
          <Carousel style={{ marginTop: 50 }} >
            <div>
            <img style={{width: '100%'}} src="https://en.hust.edu.vn/documents/112004/459957/20171206_About+HUST+banner.jpg/31bb1e81-595c-4c7e-bd9d-b794b2c87222?t=1558585094278"></img>
            </div>
          </Carousel>
          <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center'}}>
            <Avatar size={200} src='https://pbs.twimg.com/profile_images/920013284991889416/MGr9GMmX.jpg' style={{display: 'inline-block', verticalAlign: 'middle', marginTop: '-100px', border: '2px solid white'}}/>
          </div>
          <div className="ml-auto mr-auto text-center col-md-6">
            <h1>{userInfo.name}</h1>
            <h3 className="text-uppercase">{userInfo.position}</h3>
            <h4 className="font-weight-light">{userInfo.company}</h4>
            <br/>
            <h3>Enjoy Reading!</h3>
            <br />
            <br />
          </div>
          </>
          : null
        }

        <Content style={{ padding: '0 100px', marginTop: 0, minHeight: '90vh' }}>  
          <div className="site-layout-content">

            {currentPage == 'create' ?
              <FormCreatePost
                createPost={handleCreatePost}
                postLists={postLists}
                tagList={tagList}
              />
              : null
            }
            
            {currentPage == 'index' && !isUpdatePost ? 
              <>
              <TagList
                 tagList = {tagList}
                 filterTagList = {filterTagList}
                 handleChangeFilterTag = {handleChangeFilterTag}
              />
              {renderPostList(filterTagList)}
              {onToggleFormUpdatePost()}
              </>
              : <div>{onToggleFormUpdatePost()}</div>
            }
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Group 2 ©2021 ITSS</Footer>
      </Layout>
  );
}

export default App;
