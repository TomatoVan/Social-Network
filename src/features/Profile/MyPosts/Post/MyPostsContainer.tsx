import MyPosts from '../MyPosts';
import {addPost} from '../../profileReducer';
import {connect} from 'react-redux';

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

const MyPostsContainer = connect(mapStateToProps, {addPost})(MyPosts)

export default MyPostsContainer;