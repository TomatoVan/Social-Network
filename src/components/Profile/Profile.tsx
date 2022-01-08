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
	newPostText: string;
}

type profilePageType = {
	profilePage: ProfileType
	addPost: () => void
	changeNewText: (newText: string) => void
}

const Profile: React.FC<profilePageType> = (props) => {
	return (
		<div>
			<ProfileInfo/>
			<MyPosts postsData={props.profilePage.postsData} addPost={props.addPost} changeNewText={props.changeNewText} newPostText={props.profilePage.newPostText}/>
		</div>
	);
}
export default Profile;