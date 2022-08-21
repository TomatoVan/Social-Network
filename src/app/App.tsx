import React, {Suspense, useEffect} from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import {initializeApp} from './appReducer';
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
import {Preloader} from '../common/components/Preloader/Preloader';
import {Navbar} from '../features/Navbar/Navbar';
import {Dialogs} from '../features/Dialogs/Dialogs';
import {Header} from '../features/Header/Header';

export const App = () => {

	const dispatch = useAppDispatch()
	const initialized = useAppSelector(state => state.app.initialized)

	useEffect(() => {
		dispatch(initializeApp())
	}, [dispatch])

	return (
		<div className="appWrapper">
			{!initialized && <Preloader/>}
			<Header/>
			<Navbar/>

			<div className="appWrapperContent">
				<Suspense fallback={<div><Preloader/></div>}>
					<Routes>
						<Route path="/me" element={<Me/>}/>
						<Route path="/profile/:userId" element={<Profile/>}/>
						<Route path="/dialogs/*" element={<Dialogs/>}/>
						<Route path="/users" element={<Users/>}/>
						<Route path="/news" element={<News/>}/>
						<Route path="/music" element={<Music/>}/>
						<Route path="/settings" element={<Settings/>}/>
						<Route path="/login" element={<LoginForm/>}/>
						<Route path={'*'} element={<NotFound/>}/>
					</Routes>
				</Suspense>
			</div>
		</div>
	);
}




