import React from 'react';
import s from './Profile.module.css';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {profileType, setUserProfile} from "../../redux/profileReducer";
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
	setUserProfile: (profile: any) => void
}
type ownPropsType = {}

export type MapStatePropsType = mapStateType & mapDispatchType & ownPropsType

class ProfileContainer extends React.Component<MapStatePropsType & MatchParams> {

	componentDidMount() {
		let userId
		if (this.props.match !== null) {
			userId = this.props.match.params.userId
		}
		if (!userId) {
			userId = String(2)
		}
		axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
			.then(response => {
				this.props.setUserProfile(response.data);
			})
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

export default connect(mapStateToProps, {setUserProfile})(withRouter(ProfileContainer));
