import React, {Suspense, useEffect} from 'react';
import './App.css';
import Navbar from '../features/Navbar/Navbar';
import {Route, Routes} from 'react-router-dom';
import HeaderContainer from '../features/Header/HeaderContainer';
import {initializeApp} from './appReducer';
import Preloader from '../common/components/Preloader/Preloader';
import UsersContainer from '../features/Users/UserContainer';
import {useAppDispatch} from '../common/hooks/useAppDispatch';
import {useAppSelector} from '../common/hooks/useAppSelector';
import {Profile} from '../features/Profile/Profile';
import {Me} from '../features/Profile/Me';
import {NotFound} from '../features/404/NotFound';
import Dialogs from '../features/Dialogs/Dialogs';

const News = React.lazy(() => import ('../features/News/News'))
const Music = React.lazy(() => import ('../features/Music/Music'))
const Settings = React.lazy(() => import ('../features/Settings/Settings'))
const LoginForm = React.lazy(() => import ('../features/Login/LoginForm'))


export const App = () => {

	const dispatch = useAppDispatch()
	const initialized = useAppSelector(state => state.app.initialized)

	useEffect(() => {
		dispatch(initializeApp())
	}, [dispatch])

	return (
		<div className="appWrapper">
			{!initialized && <Preloader/>}
			<HeaderContainer/>
			<Navbar/>

			<div className="appWrapperContent">
				<Suspense fallback={<div><Preloader/></div>}>
					<Routes>
						<Route path="/me" element={<Me/>}/>
						<Route path="/profile/:userId" element={<Profile/>}/>
						<Route path="/dialogs/*" element={<Dialogs/>}/>
						<Route path="/users" element={<UsersContainer/>}/>
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




