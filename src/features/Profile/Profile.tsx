import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/Post/MyPostsContainer';
import Preloader from '../../common/components/Preloader/Preloader';
import {ConnectPropsType} from './ProfileContainer';


const Profile: React.FC<ConnectPropsType & { isOwner: boolean | null }> = (props) => {
	if (!props.profile) {
		return <Preloader/>
	}

	return (
		<div>
			<ProfileInfo savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus}/>
			<MyPostsContainer/>
		</div>
	);
}
export default Profile;

