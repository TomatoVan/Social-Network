import React from 'react';
import s from "./Users.module.css"
import axios from "axios";
import userPhoto from "../../assets/images/1.png"

interface IRecipeProps {
	users: any,
	setUsers: (users: any) => void,
	changeFollow: (userId: number) => void
}

interface IRecipeState {
}

class Users extends React.Component<IRecipeProps, IRecipeState> {
	constructor(props: any) {
		super(props);
		axios.get("https://social-network.samuraijs.com/api/1.0/users")
			.then(response => this.props.setUsers(response.data.items))
	}

	render() {
		return (
			<div>
				{
					this.props.users.map((u: any) => <div key={u.id} className={s.wrapper}>
					<span className={s.firstLayer}>
						<div>
							<img src={u.photos.small !== null ? u.photos.small : userPhoto} alt={''} className={s.userPhoto}/>
						</div>
						<div>
							{u.followed
								? <button onClick={() => {
									this.props.changeFollow(u.id)
								}}>Unfollow</button>
								: <button onClick={() => {
									this.props.changeFollow(u.id)
								}}>Follow</button>}
						</div>
					</span>
							<span>
						<span>
							<div>Name: {u.name}</div>
							<div>Status: {u.status}</div>
						</span>
						<span>
							{/*<div>Country: {u.location.country}</div>
							<div>City: {u.location.city}</div>*/}
						</span>
					</span>
						</div>
					)
				}
			</div>
		)
	}
}

export default Users;