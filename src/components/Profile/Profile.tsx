import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionTypes} from "../../redux/state";
import MyPostsContainer from "./MyPosts/Post/MyPostsContainer";
/*
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
}*/

const Profile: React.FC = () => {
	return (
		<div>
			<ProfileInfo/>
			<MyPostsContainer/>
		</div>
	);
}
export default Profile;

/*
postsData={props.profilePage.postsData} dispatch={props.dispatch} newPostText={props.profilePage.newPostText}*/
