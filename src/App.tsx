import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {Routes, Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import UsersContainer from "./components/Users/UserContainer";
import LoginForm from "./Login/LoginForm";


const App: React.FC = () => {
	return (
		<div className="appWrapper">
			<HeaderContainer/>
			<Navbar/>
			<div className="appWrapperContent">
				<Routes>
					<Route path='/profile/*' element={<ProfileContainer/>}/>
					<Route path='/dialogs/*' element={<DialogsContainer/>}/>
					<Route path="/users" element={<UsersContainer/>}/>
					<Route path="/news" element={<News/>}/>
					<Route path="/music" element={<Music/>}/>
					<Route path="/settings" element={<Settings/>}/>
					<Route path="/login" element={<LoginForm/>}/>
				</Routes>
			</div>
		</div>
	);
}

export default App;

/*profilePage={props.state.profilePage} dispatch={props.dispatch}*/

/*
dialogsPage={props.state.dialogsPage} dispatch={props.dispatch}*/
