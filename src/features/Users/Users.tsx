import React, {FC} from 'react';
import s from './Users.module.css'
import userPhoto from '../../assets/images/1.png'
import {NavLink} from 'react-router-dom';
import {UserType} from '../../api/usersAPI';
import {Pagination} from '../../common/components/Pagination/Pagination';

type PropsType = {
	users: Array<UserType>,
	pageSize: number,
	totalUsersCount: number,
	currentPage: number,
	onPageChange: (pageNumber: number) => void,
	inProgress: Array<number>,
	follow: (userId: number) => void,
	unFollow: (userId: number) => void
}


let Users: FC<PropsType> = ({users, pageSize, totalUsersCount, currentPage, onPageChange, inProgress, follow, unFollow}) => {

	return (
		<div>
			<Pagination currentPage={currentPage} pageSize={pageSize} totalUsersCount={totalUsersCount} setCurrentPageHandler={onPageChange}/>
			{
				users.map((u: UserType) => <div key={u.id} className={s.wrapper}>
					<span className={s.firstLayer}>
						<div>
							<NavLink to={'/profile/' + u.id}>
								<img src={u.photos.small !== null ? u.photos.small : userPhoto} alt={''} className={s.userPhoto}/>
							</NavLink>
						</div>
						<div>
							{u.followed
								? <button disabled={inProgress.some(id => id === u.id)} onClick={() => {
									follow(u.id)
								}}>Unfollow</button>
								: <button disabled={inProgress.some(id => id === u.id)} onClick={() => {
									unFollow(u.id)
								}}>Follow</button>}
						</div>
					</span>
						<span>
						<span>
							<div>Name: {u.name}</div>
							<div>Status: {u.status}</div>
						</span>
						<span>
						</span>
					</span>
					</div>
				)
			}
		</div>
	)
}

export default Users;