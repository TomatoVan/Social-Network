import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type PostType = {
	id: number
	message: string
	likes: number
}

type ProfileType = {
	postsData: Array<PostType>
}

type profilePageType = {
	profilePage: ProfileType
	addPost: (postMessage: string) => void
}

const Profile: React.FC<profilePageType> = (props) => {
	return (
		<div>
			<ProfileInfo/>
			<MyPosts postsData={props.profilePage.postsData} addPost={props.addPost}/>
		</div>
	);
}
export default Profile;