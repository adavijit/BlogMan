import React, { Component } from "react";
import axios from 'axios';

import "./index.scss";
import logo1 from './teamPic.png';
import logo2 from './facebook.png'
import logo3 from './linkedin.png'
import logo4 from './twitter.png'

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {
          name: "",
          role: "",
          content:"",
          _id: 1
        }
      ]
    };
  }

  componentDidMount() {
    axios.get('')
      .then(res => {
        this.setState({ posts: res.data.posts });
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    return (
      <React.Fragment>
        {this.state.posts.map(function (e) {
          return (
            <div className="head"><h1>OUR Tech Team</h1>
          <section id="cards-list">  
              <div key={e._id} className="cards-content">
                  <div className="cards-img">
                    <img src={logo1} 
                    alt="team pic"/>
                  </div>  
                  <div className="cards-subcontent">
                    {/* <h2>{e.name}</h2>
                    <h3>{e.role}</h3>
                    <p>{e.content}</p> */}
                    <h2>Name 1</h2>
                    <h3>Role 1</h3> 
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</p>
                    <div className="cards-logo">
                    <a href="https://www.facebook.com">
                      <img src={logo2} alt="facebook"/>
                    </a>
                    <a href="https://www.linkedin.com">
                      <img src={logo3} alt="Linkedin"/>
                    </a>
                    <a href="https://www.twitter.com">
                      <img src={logo4} alt="twitter"/>
                    </a>
                    </div> 
                  </div>
              </div>
          </section>      
            </div>  
          );
        })}
      </React.Fragment>
    );
  }
}

export default Posts;