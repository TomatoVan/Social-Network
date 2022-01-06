import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {MainState} from "./redux/state";


const App: React.FC<MainState> = (props) => {
	return (<BrowserRouter>
		<div className="appWrapper">
			<Header/>
			<Navbar/>
			<div className="appWrapperContent">
				<Routes>
					<Route path='/profile' element={<Profile profilePage={props.state.profilePage} addPost={props.addPost}/>}/>
					<Route path='/dialogs/*' element={<Dialogs dialogsPage={props.state.dialogsPage}/>}/>
					<Route path="/news" element={<News/>}/>
					<Route path="/music" element={<Music/>}/>
					<Route path="/settings" element={<Settings/>}/>
				</Routes>
			</div>
		</div>
	</BrowserRouter>);
}

export default App;
