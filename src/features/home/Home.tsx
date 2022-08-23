import React, {useEffect} from 'react';
import s from '../home/Home.module.css'
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {UserType} from '../../api/usersAPI';
import {Navigate} from 'react-router-dom';
import {getUsers} from '../users/usersReducer';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {CardUsers} from '../../common/components/cardUsers/CardUsers';
import {Preloader} from '../../common/components/preloader/Preloader';

export const Home = () => {

	const dispatch = useAppDispatch()

	const users = useAppSelector(state => state.usersPage.users)
	const totalUsersCount = useAppSelector(state => state.usersPage.totalUsersCount)
	const isAuth = useAppSelector(state => state.auth.isAuth)
	const status = useAppSelector(state => state.app.status)
	const login = useAppSelector(state => state.auth.login)
	const inProgress = useAppSelector(state => state.usersPage.inProgress)


	useEffect(() => {
		dispatch(getUsers(1, 10))
	}, [dispatch])

	if (!isAuth && status === 'idle') return <Navigate to="/login"/>
	if (status === 'loading') return <Preloader/>

	return (
		<>
			<div className={s.pageName}>HOME</div>
			<div className={s.homeMain}>
				<h1>News for you, {login}:</h1>
				<h1>All users: <span className={s.totalUsers}>{totalUsersCount}</span></h1>
				<h1 style={{margin: '20px 0 0 0 '}}>New samurai's:</h1>
				<div className={s.container}>
					{users.map((user: UserType) => {
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
					)}
				</div>
			</div>
		</>
	);
};

