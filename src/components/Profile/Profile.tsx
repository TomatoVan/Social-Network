import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionTypes} from "../../redux/state";

type PostType = {
	id: number
	message: string
	likes: number
}

type ProfileType = {
	postsData: Array<PostType>
	newPostText: string;
}

type profilePageType = {
	profilePage: ProfileType
	dispatch: (action: ActionTypes) => void
}

const Profile: React.FC<profilePageType> = (props) => {
	return (
		<div>
			<ProfileInfo/>
			<MyPosts postsData={props.profilePage.postsData} dispatch={props.dispatch} newPostText={props.profilePage.newPostText}/>
		</div>
	);
}
export default Profile;