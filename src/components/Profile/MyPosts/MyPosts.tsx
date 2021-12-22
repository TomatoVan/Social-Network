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
}

const MyPosts: React.FC<postsDataType> = (props) => {

	let postsElements = props.postsData.map((p: any) => <Post message={p.message} likes={p.likes}/>)

	return (<div className={s.postsBlock}>
		<h3>My posts</h3>
		<div>
			<div>
				<textarea> </textarea>
			</div>
			<div>
				<button>Add post</button>
			</div>
		</div>
		<div className={s.posts}>
			{postsElements}
		</div>
	</div>);
}

export default MyPosts;