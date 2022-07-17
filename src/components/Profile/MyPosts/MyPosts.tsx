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
	changeNewText: (event: string) => void
	addPost: () => void

}

const MyPosts: React.FC<postsDataType> = (props) => {

	let postsElements = props.postsData.map((p) => <Post key={p.id} message={p.message} likes={p.likes}/>)


	const addPostCallback = () => {
		props.addPost()
		/*props.dispatch(addPostAC())*/
	}

	const changeNewTextCallback = (event: ChangeEvent<HTMLTextAreaElement>) => {
		props.changeNewText(event.currentTarget.value)
		/*props.dispatch(changeNewTextAC(e.currentTarget.value))*/
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