import React from 'react';
import s from './Profile.module.css';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileUserOnMount, profileType, setUserProfile} from "../../redux/profileReducer";
import {useMatch} from "react-router-dom";

type MatchParams = {
	match: {
		params: {
			userId: string
		}
	}
}

type mapStateType = {
	profile: profileType
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

let mapStateToProps = (state: { profilePage: { profile: profileType } }) => {
	return {
		profile: state.profilePage.profile
	}
}

export default connect(mapStateToProps, {
	getProfileUserOnMount
})(withRouter(ProfileContainer));
