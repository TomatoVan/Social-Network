import React, {useEffect} from 'react';
import s from './Users.module.css'
import userPhoto from '../../assets/images/1.png'
import {Navigate, NavLink} from 'react-router-dom';
import {UserType} from '../../api/usersAPI';
import {Pagination} from '../../common/components/pagination/Pagination';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {getUsers, setFollow} from './usersReducer';
import {Preloader} from '../../common/components/preloader/Preloader';

export const Users = () => {

	const dispatch = useAppDispatch()

	const users = useAppSelector(state => state.usersPage.users)
	const inProgress = useAppSelector(state => state.usersPage.inProgress)
	const status = useAppSelector(state => state.app.status)
	const pageSize = useAppSelector(state => state.usersPage.pageSize)
	const currentPage = useAppSelector(state => state.usersPage.currentPage)
	const isAuth = useAppSelector(state => state.auth.isAuth)

	useEffect(() => {
		if (isAuth && status === 'idle') {
			dispatch(getUsers(currentPage, pageSize))
		}
	}, [dispatch, isAuth, status])

	const followingHandler = (id: number, followed: boolean) => {
		dispatch(setFollow(id, followed))
	}

	if (!isAuth && status === 'idle') return <Navigate to="/login"/>
	if (status === 'loading') return <Preloader/>

	return (
		<>
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
								 <button disabled={inProgress.some(id => id === u.id)} onClick={() => followingHandler(u.id, u.followed)}>
									 {u.followed ? 'Unfollow' : 'Follow'}
								 </button>
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
		</>
	)
}

