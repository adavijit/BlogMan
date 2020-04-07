import React, { Component } from 'react'
import './index.scss'
import pinIcon from './assests/pin.png'
import dummyImg from './assests/dummy_image.png'
import heartImg from './assests/heartIcon.png'

export class BlogOrFavorite extends Component {
	render() {
		return (
			<React.Fragment>
				<li className="fx-b30 dFlexRow blogItem">
						<div className="fx-b100 dFlexRow">
						<div className="blogPageIcon">
							{this.props.view === "favorite" ? 
							 <span><img src={heartImg}/></span>
							: 
							<span><img src={pinIcon} alt="pinBlog" />Pinned Blogs</span>
						}
		</div>
							
							<div className="dFlexColumn jContentFlexStart">
								<div className="fx-b20 blogImage">
									<img className="round-img" src={dummyImg} alt="dummy" />
								</div>
								<div className="fx-b80 dFlexRow blogContent">
									<div className = "fx-b100">
										<input className="blogInput" type="text" readOnly={this.props.view !== "blog"} placeholder="blog post 1" />
									</div>
									<div className = "fx-b100">
										<textarea className="blogInput" rows="3" readOnly={this.props.view !== "blog"} type="text" placeholder="Brief Intro about the blog post"  />
									</div>
									<div className="fx-b100 blogBtns">
										<button>Comment</button>
										<button>Share Via</button>
									</div>
								</div>
							</div>
							</div>
						</li>
			</React.Fragment>
		)
	}
}

export default BlogOrFavorite
