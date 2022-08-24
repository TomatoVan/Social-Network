import React, {useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import {UserType} from '../../api/usersAPI';
import {Pagination} from '../../common/components/pagination/Pagination';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {getUsers} from './usersReducer';
import {Preloader} from '../../common/components/preloader/Preloader';
import {CardUsers} from '../../common/components/cardUsers/CardUsers';
import s from './Users.module.css'

export const Users = () => {

	const dispatch = useAppDispatch()

	const users = useAppSelector(state => state.usersPage.users)
	const inProgress = useAppSelector(state => state.usersPage.inProgress)
	const status = useAppSelector(state => state.app.status)
	const pageSize = useAppSelector(state => state.usersPage.pageSize)
	const currentPage = useAppSelector(state => state.usersPage.currentPage)
	const isAuth = useAppSelector(state => state.auth.isAuth)

	useEffect(() => {
		if (isAuth) dispatch(getUsers(currentPage, pageSize))
	}, [dispatch, isAuth])

	if (!isAuth && status === 'idle') return <Navigate to="/login"/>
	if (status === 'loading') return <Preloader/>

	return (
		<div>
			<Pagination/>
			<div className={s.container}>
				{
					users.map((user: UserType) => {
							return (
								<CardUsers name={user.name}
													 key={user.id}
													 id={user.id}
													 uniqueUrlName={user.uniqueUrlName}
													 photos={user.photos}
													 status={user.status}
													 followed={user.followed}
													 followingInProgress={inProgress}/>
							)
						}
					)
				}
			</div>
		</div>
	)
}

