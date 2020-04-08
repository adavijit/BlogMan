import React, { Component } from 'react'
import ProfileHeader from './ProfileHeader'
import BlogOrFavorite from './BlogOrFavorite'

export class UserProfile extends Component {
	state = {
		view: "blog",
		blogs: ["blog1", "blog2", "blog3"],

	}
	handleViewChange = (view) => {
		this.setState({ view })
	}
	render() {
		return (
			<div>
				<ProfileHeader />
				<div className="mainDiv">
					<ul className="profileNavbar">
						<li className={this.state.view === "blog" ? "nav-item active " : "nav-item"} onClick={() => this.handleViewChange("blog")}>
							Blogs
						</li>
						<li className={this.state.view === "favorite" ? "nav-item active " : "nav-item"} onClick={() => this.handleViewChange("favorite")}>
							Favorite
						</li>
						<li className={this.state.view === "followers" ? "nav-item active " : "nav-item"} onClick={() => this.handleViewChange("followers")}>
							Followers
						</li>
						<li className={this.state.view === "following" ? "nav-item active " : "nav-item"} onClick={() => this.handleViewChange("following")}>
							Followings
						</li>
					</ul>
					{this.state.view === "blog" || this.state.view === "favorite"
						?
						<ul className="contentContainer dFlexRow">
							{this.state.view === "blog" ?
								this.state.blogs.map((item, index) => (
									<BlogOrFavorite key={index} view={this.state.view} />
								))
								:
								''
							}

						</ul>
						:
						''
					}
				</div>
			</div>
		)
	}
}

export default UserProfile
