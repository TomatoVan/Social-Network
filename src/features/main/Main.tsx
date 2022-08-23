import React from 'react';
import s from './Main.module.css';
import {Route, Routes} from 'react-router-dom';
import {Home} from '../home/Home';
import {MyProfile} from '../profile/MyProfile';
import {Profile} from '../profile/Profile';
import {Dialogs} from '../dialogs/Dialogs';
import {Users} from '../users/Users';
import {News} from '../news/News';
import {Music} from '../music/Music';
import {Settings} from '../settings/Settings';
import {LoginForm} from '../login/LoginForm';
import {NotFound} from '../404/NotFound';

export const Main = () => {
	return (
		<div className={s.main}>
			<Routes>
				<Route path="/" element={<Home/>}/>
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
		</div>
	);
};

