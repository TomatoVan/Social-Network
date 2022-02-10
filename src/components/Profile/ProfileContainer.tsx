import React from 'react';
import s from './Profile.module.css';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";


interface IProfileProps {
	setUserProfile: (profile: any) => void,
	profile: any
}

interface IProfileState {
}


class ProfileContainer extends React.Component<IProfileProps, IProfileState> {

	componentDidMount() {
		axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
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

let mapStateToProps = (state: { profilePage: { profile: any } }) => {
	return {
		profile: state.profilePage.profile
	}
}


export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);

/*
postsData={props.profilePage.postsData} dispatch={props.dispatch} newPostText={props.profilePage.newPostText}*/
