import React from 'react';
import MyPosts from "../MyPosts";
import {addPostAC, changeNewTextAC} from "../../../../redux/profile-reducer";
import {ActionTypes} from "../../../../redux/state";
import {connect} from "react-redux";

/*type postsDataType = {
	postsData: Array<PostType>
	newPostText: string
	dispatch: (action: ActionTypes) => void
}*/

let mapStateToProps = (state: { profilePage: { newPostText: any, postsData: any } }) => {
	return {
		newPostText: state.profilePage.newPostText,
		postsData: state.profilePage.postsData
	}
}

let mapDispatchToProps = (dispatch: (action: ActionTypes) => void) => {
	return {
		updateNewPostText: (event: string) => {
			dispatch(changeNewTextAC(event))
		},
		addPost: () => {
			dispatch(addPostAC())
		}
	}
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;