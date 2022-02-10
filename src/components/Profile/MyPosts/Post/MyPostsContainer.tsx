import MyPosts from "../MyPosts";
import {addPost, changeNewText, GeneralTypes} from "../../../../redux/profile-reducer";
import {connect} from "react-redux";

let mapStateToProps = (state: { profilePage: { newPostText: any, postsData: any } }) => {
	return {
		newPostText: state.profilePage.newPostText,
		postsData: state.profilePage.postsData
	}
}

let mapDispatchToProps = (dispatch: (action: GeneralTypes) => void) => {
	return {
		updateNewPostText: (event: string) => {
			dispatch(changeNewText(event))
		},
		addPost: () => {
			dispatch(addPost())
		}
	}
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;