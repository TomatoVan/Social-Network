import React, {useEffect} from 'react';
import './App.module.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import {useAppDispatch} from '../common/hooks/useAppDispatch';
import {useAppSelector} from '../common/hooks/useAppSelector';
import {Profile} from '../features/Profile/Profile';
import {Me} from '../features/Profile/Me';
import {NotFound} from '../features/404/NotFound';
import {Users} from '../features/Users/Users';
import {Music} from '../features/Music/Music';
import {News} from '../features/News/News';
import {Settings} from '../features/Settings/Settings';
import {LoginForm} from '../features/Login/LoginForm';
import {Dialogs} from '../features/Dialogs/Dialogs';
import {Header} from '../features/Header/Header';
import {getAuthUserData} from '../features/Login/authReducer';
import {ErrorSnackBar} from '../common/components/snackbars/ErrorSnackbar';
import s from './App.module.css'
import {Navbar} from '../common/components/navbar/Navbar';

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
						<Route path="/me" element={<Me/>}/>
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




