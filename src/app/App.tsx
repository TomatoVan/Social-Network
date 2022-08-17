import React from 'react';
import './App.css';
import Navbar from '../features/Navbar/Navbar';
import News from '../features/News/News';
import Music from '../features/Music/Music';
import {Route, Routes} from 'react-router-dom';
import DialogsContainer from '../features/Dialogs/DialogsContainer';
import ProfileContainer, {withRouter} from '../features/Profile/ProfileContainer';
import HeaderContainer from '../features/Header/HeaderContainer';
import LoginForm from '../features/Login/LoginForm';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {initializeApp} from './appReducer';
import {AppRootStateType} from './store';
import Preloader from '../common/components/Preloader/Preloader';
import Settings from '../features/Settings/Settings';
import UsersContainer from '../features/Users/UserContainer';

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
				{!this.props.initialized && <Preloader/>}
				<HeaderContainer/>
				<Navbar/>
				<div className="appWrapperContent">
					<Routes>
						<Route path="/profile/*" element={<ProfileContainer/>}/>
						<Route path="/dialogs/*" element={<DialogsContainer/>}/>
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
}

const mapStateToProps = (state: AppRootStateType) => {
	return {
		initialized: state.app.initialized
	}
}

export default compose<React.ComponentType>(
	withRouter,
	connect(mapStateToProps, {initializeApp}))(App);


