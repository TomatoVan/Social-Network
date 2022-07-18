import MyPosts from "../MyPosts";
import {addPost} from "../../../../redux/profileReducer";
import {connect} from "react-redux";

type mapStateType = {
	profilePage: {
		newPostText: string
		postsData: { id: number, message: string, likes: number }[]
	}
}

let mapStateToProps = (state: mapStateType) => {
	return {
		newPostText: state.profilePage.newPostText,
		postsData: state.profilePage.postsData
	}
}

// let mapDispatchToProps = (dispatch: (action: GeneralTypes) => void) => {
// 	return {
// 		updateNewPostText: (event: string) => {
// 			dispatch(changeNewText(event))
// 		},
// 		addPost: () => {
// 			dispatch(addPost())
// 		}
// 	}
// }

const MyPostsContainer = connect(mapStateToProps, {addPost})(MyPosts)

export default MyPostsContainer;