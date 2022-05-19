import React from 'react';
import s from './Profile.module.css';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileUserOnMount, profileType, setUserProfile} from "../../redux/profileReducer";
import {Navigate, useMatch} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {AppStateType} from "../../redux/reduxStore";
import {compose} from "redux";
import Dialogs from "../Dialogs/Dialogs";

type MatchParams = {
	match: {
		params: {
			userId: string
		}
	}
}

type mapStateType = {
	profile: profileType,
	isAuth: boolean
}
type mapDispatchType = {
	getProfileUserOnMount: (userId: string) => void
}

export type MapStatePropsType = mapStateType & mapDispatchType

class ProfileContainer extends React.Component<MapStatePropsType & MatchParams> {

	componentDidMount() {
		let userId
		if (this.props.match !== null) {
			userId = this.props.match.params.userId
		}
		if (!userId) {
			userId = String(2)
		}

		this.props.getProfileUserOnMount(userId)
	}

	render() {
		return (
			<Profile {...this.props}/>
		)
	}
}


export const withRouter = (Component: any) => {
	return (props: any) => {
		const match = useMatch('/profile/:userId/');
		return <Component {...props} match={match}/>;
	};
}

let mapStateToProps = (state: AppStateType) => {
	return {
		profile: state.profilePage.profile,
	}
}


// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)
// export default connect(mapStateToProps, {
// 	getProfileUserOnMount
// })(withRouter(AuthRedirectComponent));

export default compose<React.ComponentType>(
	connect(mapStateToProps, {getProfileUserOnMount}),
	withRouter,
	withAuthRedirect
)(ProfileContainer)
