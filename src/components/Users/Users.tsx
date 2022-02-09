import React from 'react';
import s from "./Users.module.css"
import userPhoto from "../../assets/images/1.png"

type PropsType = {
	users: any,
	changeFollow: (userId: number) => void,
	pageSize: number,
	totalUsersCount: number,
	currentPage: number
	onPageChange: (pageNumber: number) => void
}


let Users = (props: PropsType) => {

	let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
	let pages = []
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	return (
		<div>
			<div>
				{pages.map(p => {
					return <span className={props.currentPage === p ? s.selectedPage : s.notSelectedPage}
								 onClick={() => props.onPageChange(p)}>{p}</span>
				})}
			</div>
			{
				props.users.map((u: any) => <div key={u.id} className={s.wrapper}>
					<span className={s.firstLayer}>
						<div>
							<img src={u.photos.small !== null ? u.photos.small : userPhoto} alt={''} className={s.userPhoto}/>
						</div>
						<div>
							{u.followed
								? <button onClick={() => {
									props.changeFollow(u.id)
								}}>Unfollow</button>
								: <button onClick={() => {
									props.changeFollow(u.id)
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

export default Users;