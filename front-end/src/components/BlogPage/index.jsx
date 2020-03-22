import React, { Component } from 'react'
// import Navbar from "../Common/Navbar"
import Interests from "./Interests";
import Notifications from "./Notifications";
import Trending from "./Trending";
import Blog from "./Blog";
import BlogNav from "./BlogNav";
import "./style.scss"

let blogs = [
  { 
    id: 1,
    title: "Lorem ipsum dolor sit amet.",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam nemo officia aut necessitatibus alias natus laboriosam! Delectus deleniti, harum necessitatibus illum excepturi temporibus culpa quibusdam odit quo saepe, dicta consequatur, nesciunt nihil sequi. Beatae magni fugit suscipit, quis dolorem quaerat, quia voluptate consequuntur nostrum sed excepturi at veritatis iusto quidem!"
  },
  { 
    id: 2,
    title: "Lorem ipsum dolor sit amet.",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam nemo officia aut necessitatibus alias natus laboriosam! Delectus deleniti, harum necessitatibus illum excepturi temporibus culpa quibusdam odit quo saepe, dicta consequatur, nesciunt nihil sequi. Beatae magni fugit suscipit, quis dolorem quaerat, quia voluptate consequuntur nostrum sed excepturi at veritatis iusto quidem!"
  },
  { 
    id: 3,
    title: "Lorem ipsum dolor sit amet.",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam nemo officia aut necessitatibus alias natus laboriosam! Delectus deleniti, harum necessitatibus illum excepturi temporibus culpa quibusdam odit quo saepe, dicta consequatur, nesciunt nihil sequi. Beatae magni fugit suscipit, quis dolorem quaerat, quia voluptate consequuntur nostrum sed excepturi at veritatis iusto quidem!"
  },
]

let notifications = [
  "John liked your post",
  "John commented on your post",
  "Harry commented on your post",
  "Jack and 12 others liked your post",
]

let interests = [
  "Science",
  "Computer Architecture",
  "React Js",
  "Flutter",
  "Node js",
]

let trending = [
  "Web dev guide for beginners",
  "get started with android",
  "How to start open source contribution",
  "get started with Artificial intelligence",
]

export default class BlogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      blogs: [],
      notifications: [],
      interests: [],
      trending: [],
    };
  }

  fetchData = () => {
    // To fetch data from server
    this.setState({
      blogs: blogs,
      notifications: notifications,
      interests: interests,
      trending: trending,
    })
  };
  
  componentDidMount(){
    this.fetchData();
  }

  render() {
    
    return (
      <div className="blogPage">
        <BlogNav />
        <div className="row m-0 p-3">
          <div className="col-lg-2 col-md-3">
            <Notifications notifications={this.state.notifications} />
            <Interests interests={this.state.interests} />
          </div>
          <div className="col-lg-8 col-md-9">
            <div className="row">
              <div className="col-lg-12 blog mb-3 p-1 media">
                <img
                  src="http://dipsinternational.com/wp-content/uploads/2017/03/user-icon-fontawesome.png"
                  alt="user icon"
                  className="img-responsive img-fluid m-2 user-img"
                />
                <div className="media-body input-group mb-1 mr-1 d-flex flex-column">
                  <input
                    type="text"
                    className="form-control my-2 w-100"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder="Title for new blog"
                  />
                  <textarea
                    className="form-control mb-2 w-100"
                    rows="4"
                    aria-label="With textarea"
                    placeholder="Create new blog..."
                  ></textarea>
                  <div className="buttons">
                    <button className="btn btn-light btn-sm">Open With</button>
                    <button className="btn btn-light float-right btn-sm">Post</button>
                  </div>
                </div>
              </div>
              <Blog blogs={this.state.blogs} />
            </div>
          </div>
          <div className="col-md-3 d-lg-none"></div>
          <div className="col-lg-2 col-md-9">
            <Trending trending={this.state.trending} />
          </div>
        </div>
      </div>
    );
  }
}
