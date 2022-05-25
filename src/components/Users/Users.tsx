import React from 'react';
import s from "./Users.module.css"
import userPhoto from "../../assets/images/1.png"
import {NavLink} from "react-router-dom";
import {userType} from "../../redux/usersReducer";

type PropsType = {
	users: Array<userType>,
	pageSize: number,
	totalUsersCount: number,
	currentPage: number,
	onPageChange: (pageNumber: number) => void,
	inProgress: Array<number>,
	follow: (userId: number) => void,
	unFollow: (userId: number) => void
}


let Users = (props: PropsType) => {
	console.log(props)

	let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
	let pages = []
	if (pagesCount > 10) {
		if (props.currentPage > 5) {
			for (let i = props.currentPage - 2; i <= props.currentPage + 2; i++) {
				pages.push(i)
				if (i === pagesCount) break
			}

		} else {
			for (let i = 1; i <= 6; i++) {
				pages.push(i)
				if (i === pagesCount) break
			}
		}
	} else {
		for (let i = 1; i <= pagesCount; i++) {
			pages.push(i)
		}
	}
	return (
		<div>
			<div className={s.pagesList}>
				<span className={props.currentPage <= 5 ? s.hidePage : s.notSelectedPage}
					  onClick={() => props.onPageChange(1)}> 1 ...
				</span>
				{pages.map((p: number) => {
					return <span className={props.currentPage === p ? s.selectedPage : s.notSelectedPage}
								 onClick={() => props.onPageChange(p)}>{p}
							</span>
				})}
				<span className={props.currentPage + 2 >= pagesCount ? s.hidePage : s.notSelectedPage}
					  onClick={() => props.onPageChange(pagesCount)}> ... {pagesCount}
				</span>
			</div>

			{
				props.users.map((u: userType) => <div key={u.id} className={s.wrapper}>
					<span className={s.firstLayer}>
						<div>
							<NavLink to={'/profile/' + u.id}>
								<img src={u.photos.small !== null ? u.photos.small : userPhoto} alt={''} className={s.userPhoto}/>
							</NavLink>
						</div>
						<div>
							{u.followed
								? <button disabled={props.inProgress.some(id => id === u.id)} onClick={() => {
									props.follow(u.id)
									// props.setInProgress(true, u.id)
									// usersAPI.setUnfollow(u.id).then(data => {
									// 	if (data.resultCode === 0) {
									// 		props.setFollowing(u.id)
									// 	}
									// 	props.setInProgress(false, u.id)
									// })
								}}>Unfollow</button>
								: <button disabled={props.inProgress.some(id => id === u.id)} onClick={() => {
									props.unFollow(u.id)
									// props.setInProgress(true, u.id)
									// usersAPI.setFollow(u.id).then(data => {
									// 	if (data.resultCode === 0) {
									// 		props.setFollowing(u.id)
									// 	}
									// 	props.setInProgress(false, u.id)
									// })
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