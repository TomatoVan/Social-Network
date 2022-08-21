import React, {useEffect} from 'react';
import s from './Users.module.css'
import userPhoto from '../../assets/images/1.png'
import {NavLink} from 'react-router-dom';
import {UserType} from '../../api/usersAPI';
import {Pagination} from '../../common/components/Pagination/Pagination';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {getUsers, setFollow, setUnFollow} from './usersReducer';
import Preloader from '../../common/components/Preloader/Preloader';

export const Users = () => {

	const dispatch = useAppDispatch()

	const users = useAppSelector(state => state.usersPage.users)
	const inProgress = useAppSelector(state => state.usersPage.inProgress)
	const isFetching = useAppSelector(state => state.usersPage.isFetching)
	const pageSize = useAppSelector(state => state.usersPage.pageSize)
	const currentPage = useAppSelector(state => state.usersPage.currentPage)

	useEffect(() => {
		dispatch(getUsers(currentPage, pageSize))
	}, [])

	return (
		<>
			{isFetching ? <Preloader/> :
				<div>
					<Pagination/>
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
									dispatch(setFollow(u.id))
								}}>Unfollow</button>
								: <button disabled={inProgress.some(id => id === u.id)} onClick={() => {
									dispatch(setUnFollow(u.id))
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
			}
		</>
	)
}

