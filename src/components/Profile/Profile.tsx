import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/Post/MyPostsContainer";
import Preloader from "../../common/Preloader/Preloader";
import {updateUserStatus} from "../../redux/profileReducer";


const Profile: React.FC = (props: any) => {
	if (!props.profile) {
		return <Preloader/>
	}

	return (
		<div>
			<ProfileInfo profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus}/>
			<MyPostsContainer/>
		</div>
	);
}
export default Profile;

