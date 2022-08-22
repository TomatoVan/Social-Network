import React, {useEffect} from 'react';
import './App.module.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import {useAppDispatch} from '../common/hooks/useAppDispatch';
import {useAppSelector} from '../common/hooks/useAppSelector';
import {NotFound} from '../features/404/NotFound';
import {Users} from '../features/users/Users';
import {Music} from '../features/music/Music';
import {News} from '../features/news/News';
import {Settings} from '../features/settings/Settings';
import {LoginForm} from '../features/login/LoginForm';
import {Header} from '../features/header/Header';
import {getAuthUserData} from '../features/login/authReducer';
import {ErrorSnackBar} from '../common/components/snackbars/ErrorSnackbar';
import s from './App.module.css'
import {Navbar} from '../common/components/navbar/Navbar';
import {MyProfile} from '../features/profile/MyProfile';
import {Profile} from '../features/profile/Profile';
import {Dialogs} from '../features/dialogs/Dialogs';

export const App = () => {

	const dispatch = useAppDispatch()
	const initialized = useAppSelector(state => state.app.initialized)
	const status = useAppSelector(state => state.app.status)

	useEffect(() => {
		dispatch(getAuthUserData())
	}, [dispatch])


	if (!initialized && status === 'idle') return <Navigate to={'/login'}/>

	return (
		<div className={s.app}>
			<Header/>
			<div className={s.flexMain}>
				<Navbar/>
				<div className={s.main}>
					<Routes>
						<Route path="/me" element={<MyProfile/>}/>
						<Route path="/profile/:userId" element={<Profile/>}/>
						<Route path="/messages/*" element={<Dialogs/>}/>
						<Route path="/friends" element={<Users/>}/>
						<Route path="/news" element={<News/>}/>
						<Route path="/music" element={<Music/>}/>
						<Route path="/settings" element={<Settings/>}/>
						<Route path="/login" element={<LoginForm/>}/>
						<Route path={'/*'} element={<NotFound/>}/>
					</Routes>
					<ErrorSnackBar/>
				</div>
			</div>
		</div>
	);
}




