import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Blog extends Component {
  render() {
    return (
      <div>
        {this.props.blogs.map(blog => (
          <div key={blog.id} className="col-lg-12 blog mb-3 p-1 media">
            <img
                src="http://dipsinternational.com/wp-content/uploads/2017/03/user-icon-fontawesome.png"
                alt="user icon"
                className="img-responsive img-fluid m-2 user-img"
            />
            <div className="media-body input-group mb-1 mr-1">
                <div className="my-2 font-weight-bold p-2 bg-light w-100">{blog.title}</div>
                <div className="mb-2 p-2 bg-light w-100">
                  {blog.text.substring(0, 300)} <Link to="#">...Read More</Link>
                </div>
                <div className="buttons d-flex w-100">
                    <button className="btn btn-light btn-sm">Like</button>
                    <button className="btn btn-light ml-2 btn-sm">Comment</button>
                    <button className="btn btn-light ml-auto btn-sm">Share Via</button>
                </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
