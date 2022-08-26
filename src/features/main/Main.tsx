import React from 'react';
import s from './Main.module.css';
import {Route, Routes} from 'react-router-dom';
import {Home} from '../home/Home';
import {UserProfile} from '../userProfile/UserProfile';
import {Dialogs} from '../dialogs/Dialogs';
import {Users} from '../users/Users';
import {Music} from '../music/Music';
import {Settings} from '../settings/Settings';
import {LoginForm} from '../login/LoginForm';
import {NotFound404} from '../../common/components/404/NotFound404';
import {MeProfile} from '../meProfile/MeProfile';

export const Main = () => {
	return (
		<div className={s.main}>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/me" element={<MeProfile/>}/>
				<Route path="/profile/:userId" element={<UserProfile/>}/>
				<Route path="/messages" element={<Dialogs/>}/>
				<Route path="/friends" element={<Users/>}/>
				<Route path="/music" element={<Music/>}/>
				<Route path="/settings" element={<Settings/>}/>
				<Route path="/login" element={<LoginForm/>}/>
				<Route path={'/*'} element={<NotFound404/>}/>
			</Routes>
		</div>
	);
};

