import React from 'react';
import s from "./Users.module.css"
import userPhoto from "../../assets/images/1.png"

type PropsType = {
	users: any,
	setFollowing: (userId: number) => void,
	pageSize: number,
	totalUsersCount: number,
	currentPage: number,
	onPageChange: (pageNumber: number) => void,

}


let Users = (props: PropsType) => {

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
				{pages.map(p => {
					return <span className={props.currentPage === p ? s.selectedPage : s.notSelectedPage}
								 onClick={() => props.onPageChange(p)}>{p}
							</span>
				})}
				<span className={props.currentPage + 2 >= pagesCount ? s.hidePage : s.notSelectedPage}
					  onClick={() => props.onPageChange(pagesCount)}> ... {pagesCount}
				</span>
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
									props.setFollowing(u.id)
								}}>Unfollow</button>
								: <button onClick={() => {
									props.setFollowing(u.id)
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