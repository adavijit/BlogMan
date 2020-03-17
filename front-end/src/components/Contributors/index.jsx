import React, { Component } from 'react'
import axios from 'axios'
import './index.scss'
export class Contributors extends Component {
	componentWillMount() {
		axios.get('https://api.github.com/repos/adavijit/BlogMan/stats/contributors').then((data) => {
			this.setState({ contributors: data.data })
		})
	}
	state = {
		contributors: []
	}
	render() {
		this.state.contributors.sort((a,b)=>b-a)
		return (
			<div>
				<h2 className="contributorHeading">Our Contributors</h2>
				<ul className="flex-list">
					{this.state.contributors.map((user,index) => (
						<li className="flip-card" key={index} >
							<div className="flip-card-inner">
								<div className="flip-card-front">
									<div>
										<img className="image-div" src={user.author.avatar_url} alt="Avatar" />
									</div>
								</div>
								<div className="flip-card-back">
									<h4>{user.author.login}</h4>
									<div className={"commits"}><span>Commits : {user.total}</span></div>
									<p className="profile-link"> <a href={user.author.html_url} alt="Github profile">View Full Github Profile</a> </p>
								</div>
							</div>
						</li>
                    ))}
				</ul>
			</div>
		)
	
	}
}

export default Contributors
