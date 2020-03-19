import React, { Component } from 'react'
import ProfileHeader from './ProfileHeader'
import pinIcon from './assests/pin.png'
import dummyImg from './assests/dummy_image.png'

export class UserProfile extends Component {
	state = {
		view : "blog"
	}
	handleViewChange = (view) => {
		this.setState({view})
	}
	render() {
		return (
			<div>
				<ProfileHeader/>
				<div className = "mainDiv">
					<ul className="profileNavbar">
						<li className={this.state.view ==="blog" ? "nav-item active " : "nav-item"} onClick={() => this.handleViewChange("blog")}>
							Blogs
						</li>
						<li className={this.state.view ==="favorite" ? "nav-item active " : "nav-item"} onClick={() => this.handleViewChange("favorite")}>
							Favorite
						</li>
						<li className={this.state.view ==="followers" ? "nav-item active " : "nav-item"} onClick={() => this.handleViewChange("followers")}>
							Followers
						</li>
						<li className={this.state.view ==="following" ? "nav-item active " : "nav-item"} onClick={() => this.handleViewChange("following")}>
							Followings
						</li>
					</ul>
					<ul className="contentContainer dFlexRow">
					
						<li className="fx-b30 dFlexRow blogItem">
						<div className="fx-b100 dFlexRow">
						<div className="blogPageIcon"><span><img src={pinIcon} alt="pinBlog" />Pinned Blogs</span></div>
							<div className="dFlexColumn jContentFlexStart">
								<div className="fx-b20 blogImage">
									<img className="round-img" src={dummyImg} alt="dummy" />
								</div>
								<div className="fx-b80 dFlexRow blogContent">
									<div className = "fx-b100">
										<input className="blogInput" type="text" placeholder="blog post 1" />
									</div>
									<div className = "fx-b100">
										<textarea className="blogInput" rows="3" type="text" placeholder="Brief Intro about the blog post"  />
									</div>
									<div className="fx-b100 blogBtns">
										<button>Comment</button>
										<button>Share Via</button>
									</div>
								</div>
							</div>
							</div>
						</li>
						<li className="fx-b30 dFlexRow blogItem">
						<div className="fx-b100 dFlexRow">
							<div className="blogPageIcon"><span><img src={pinIcon} alt="pinBlog" />Pinned Blogs</span></div>
							<div className="dFlexColumn jContentFlexStart">
								<div className="fx-b20 blogImage">
									<img className="round-img" src={dummyImg} alt="dummy" />
								</div>
								<div className="fx-b80 dFlexRow blogContent">
									<div className = "fx-b100">
										<input className="blogInput" type="text" placeholder="blog post 1" />
									</div>
									<div className = "fx-b100">
										<textarea className="blogInput" rows="3" type="text" placeholder="Brief Intro about the blog post"  />
									</div>
									<div className="fx-b100 blogBtns">
										<button>Comment</button>
										<button>Share Via</button>
									</div>
								</div>
							</div>
							</div>
						</li>
						<li className="fx-b30 dFlexRow blogItem">
						<div className="fx-b100 dFlexRow">
						<div className="blogPageIcon"><span><img src={pinIcon} alt="pinBlog" />Pinned Blogs</span></div>
							<div className="dFlexColumn jContentFlexStart">
								<div className="fx-b20 blogImage">
									<img className="round-img" src={dummyImg} alt="dummy" />
								</div>
								<div className="fx-b80 dFlexRow blogContent">
									<div className = "fx-b100">
										<input className="blogInput" type="text" placeholder="blog post 1" />
									</div>
									<div className = "fx-b100">
										<textarea className="blogInput" rows="3" type="text" placeholder="Brief Intro about the blog post"  />
									</div>
									<div className="fx-b100 blogBtns">
										<button>Comment</button>
										<button>Share Via</button>
									</div>
								</div>
							</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default UserProfile
