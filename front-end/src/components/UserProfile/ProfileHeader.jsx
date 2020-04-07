import React, { Component } from 'react'
import './index.scss'
import dummyImg from './assests/dummy_image.png'
import fbIcon from './assests/facebookIcon.png'
import githubIcon from './assests/githubIcon.png'
import twitterIcon from './assests/twitterIcon.png'
import instagramIcon from './assests/InstagramIcon.png'
export class ProfileHeader extends Component {
	render() {
		return (
			<div className="dFlexRow headerContainer"> 
				<div className="profileAvatarDiv">
					<img className="profileAvatar round-img" src={dummyImg} alt="dummy" />
				</div>
				<div className="fx-b40 headerProfileDetailsContainer">
					<h3>User Name</h3>
					<h5>@profile</h5>
					<p>Brief bio about the user </p>
					</div>
					<div className="fx-b40 socialLinksDiv">
						<ul className="socialLinks">
						<li>
							<img src={githubIcon} alt="github-icon" title="github-icon" />
							</li>
							
						<li>
							<img src={twitterIcon} alt="twitter-icon" title="twitter-icon" />
							</li>
							
						<li>
							<img src={instagramIcon} alt="instagram-icon" title="instagram-icon" />
							</li>
							
						<li >
							<img src={fbIcon} alt="facebook-icon" title="facebook-icon"/>
							</li>
							</ul>
							<button className="editProfileBtn">Edit Profile</button>
						</div>
						
			</div>
		)
	}
}

export default ProfileHeader
