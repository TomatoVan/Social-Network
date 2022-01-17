import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {ActionTypes} from "../../../redux/state";
import {addPostAC, changeNewTextAC} from "../../../redux/profile-reducer";

type PostType = {
	id: number
	message: string
	likes: number
}

type postsDataType = {
	postsData: Array<PostType>
	newPostText: string
	dispatch: (action: ActionTypes) => void

}

const MyPosts: React.FC<postsDataType> = (props) => {

	let postsElements = props.postsData.map((p) => <Post message={p.message} likes={p.likes}/>)


	const addPostCallback = () => {
		props.dispatch(addPostAC())
	}

	const changeNewTextCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
		props.dispatch(changeNewTextAC(e.currentTarget.value))
	}

	return (<div className={s.postsBlock}>
		<h3>My posts</h3>
		<div>
			<div>
				<textarea onChange={changeNewTextCallback} value={props.newPostText}/>
			</div>
			<div>
				<button onClick={addPostCallback}>Add post</button>
			</div>
		</div>
		<div className={s.posts}>
			{postsElements}
		</div>
	</div>);
}

export default MyPosts;