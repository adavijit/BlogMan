import React, { Component } from "react";
import dummyImg from "./assests/dummy_image.png";
import './index.scss'

export class FollowList extends Component {
	render() {
		return (
			<React.Fragment>
				<li className="fx-b50 dFlexRow blogItem ">
					<div className="fx-b100 dFlexRow pt-2 pb-2">
					<div className="fx-b35 blogImage">
					<img className="round-img" src={dummyImg} alt="dummy" />
					</div>
					<div className="fx-b60 dFlexRow followerInfo">
						<h4 className="fx-b100">Name</h4>
						<p className="fx-b100">@userHandle</p>
						<div className="fx-b100 blogBtns">
							<button>Following</button>
						</div>
					</div>
					</div>
				</li>
			</React.Fragment>
		);
	}
}

export default FollowList;