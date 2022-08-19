import React, {Suspense} from 'react';
import './App.css';
import Navbar from '../features/Navbar/Navbar';
import {Route, Routes} from 'react-router-dom';
import DialogsContainer from '../features/Dialogs/DialogsContainer';
import ProfileContainer, {withRouter} from '../features/Profile/ProfileContainer';
import HeaderContainer from '../features/Header/HeaderContainer';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {initializeApp} from './appReducer';
import {AppRootStateType} from './store';
import Preloader from '../common/components/Preloader/Preloader';
import UsersContainer from '../features/Users/UserContainer';

const News = React.lazy(() => import ('../features/News/News'))
const Music = React.lazy(() => import ('../features/Music/Music'))
const Settings = React.lazy(() => import ('../features/Settings/Settings'))
const LoginForm = React.lazy(() => import ('../features/Login/LoginForm'))

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
					<Suspense fallback={<div><Preloader/></div>}>
						<Routes>
							<Route path="/profile/*" element={<ProfileContainer/>}/>
							<Route path="/dialogs/*" element={<DialogsContainer/>}/>
							<Route path="/users" element={<UsersContainer/>}/>
							<Route path="/news" element={<News/>}/>
							<Route path="/music" element={<Music/>}/>
							<Route path="/settings" element={<Settings/>}/>
							<Route path="/login" element={<LoginForm/>}/>
						</Routes>
					</Suspense>
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


