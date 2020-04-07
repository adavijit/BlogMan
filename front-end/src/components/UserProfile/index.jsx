import React, { Component } from 'react'
import ProfileHeader from './ProfileHeader'
import BlogOrFavorite from './BlogOrFavorite'
import FollowList from './FollowList'
import Suggestions from './Suggestions'

export class UserProfile extends Component {
	state = {
		view: "blog",
		blogs: ["blog1", "blog2", "blog3"],
		favorites: ["fav1", "fav2", "fav3"],
		followers: ["follower1", "follower1", "follower1", "follower1"],
		followings: ["follower1", "follower1", "follower1", "follower1"],
		suggestions: ["suggestion1", "suggestion2"]

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
								this.state.favorites.map((item, index) => (
									<BlogOrFavorite key={index} view={this.state.view} />
								))

							}

						</ul>
						:
						<div className="dFlexRow">
							<div className="fx-b70 dFlexRow outerFollowDiv">

								<ul className="contentContainer dFlexRow followerContent">
									{/* Followers/Following List */}
									{this.state.view === "followers" ?
										this.state.followers.map((item, index) => (
											<FollowList key={index} view={"follower"} />
										))
										:
										this.state.followings.map((item, index) => (
											<FollowList key={index} view={"followings"} />
										))
									}
								</ul>
							</div>
							<div className="fx-b30 outerSuggestionDiv">
								<div className="contentContainer suggestionOuter dFlexRow">
									<h4 className="fx-b100">Suggestions</h4>
									<ul className="fx-b100 contentContainer dFlexRow">
										{/* Suggestion List */}
										{this.state.suggestions.map((item, index) => (
											<Suggestions key={index} />
										))}
									</ul>
								</div>
							</div>
						</div>

					}
				</div>
			</div>
		)
	}
}

export default UserProfile
