import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";

type PostType = {
	id: number
	message: string
	likes: number
}

type postsDataType = {
	postsData: Array<PostType>
	addPost: (postMessage: string) => void
}

const MyPosts: React.FC<postsDataType> = (props) => {

	let postsElements = props.postsData.map((p) => <Post message={p.message} likes={p.likes}/>)

	const inputRef = React.createRef<HTMLTextAreaElement>()
	const addPost = () => {
		let text = inputRef.current?.value
		if (typeof text === "string") {
			props.addPost(text)
			// @ts-ignore
			inputRef.current.value = '';
		}
	}

	return (<div className={s.postsBlock}>
		<h3>My posts</h3>
		<div>
			<div>
				<textarea ref={inputRef}> </textarea>
			</div>
			<div>
				<button onClick={addPost}>Add post</button>
			</div>
		</div>
		<div className={s.posts}>
			{postsElements}
		</div>
	</div>);
}

export default MyPosts;