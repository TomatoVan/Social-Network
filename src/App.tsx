import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {Routes, Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import ProfileContainer, {withRouter} from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import UsersContainer from "./components/Users/UserContainer";
import LoginForm from "./Login/LoginForm";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp, initializedSuccess} from "./redux/appReducer";
import {stat} from "fs";
import {AppRootStateType} from "./redux/reduxStore";
import Preloader from "./common/Preloader/Preloader";

type AppPropsType = {
	initializeApp: () => void
	initialized: boolean
}

class App extends React.Component<AppPropsType> {

	componentDidMount() {
		this.props.initializeApp()
	}

	render() {

		return (
			<div className="appWrapper">
				{!this.props.initialized
					? <Preloader/>
					: <>
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
					</>
				}
			</div>
		);
	}
}

const mapStateToProps = (state: AppRootStateType) => {
	return {
		initialized: state.app.initialized
	}
}

export default compose<React.ComponentType>(
	withRouter,
	connect(mapStateToProps, {initializeApp}))(App);


