import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";

type PostType = {
	id: number
	message: string
	likes: number
}

type postsDataType = {
	postsData: Array<PostType>
	newPostText: string
	addPost: () => void
	changeNewText: (newText: string) => void

}

const MyPosts: React.FC<postsDataType> = (props) => {

	let postsElements = props.postsData.map((p) => <Post message={p.message} likes={p.likes}/>)


	const addPostCallback = () => {
		props.addPost()
	}

	const changeNewTextCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
		props.changeNewText(e.currentTarget.value)
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