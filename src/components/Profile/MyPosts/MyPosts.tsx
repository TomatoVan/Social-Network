import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";

const MyPosts = (props: any) => {


	let postsElements = props.postsData.map((p: any) => <Post message={p.message} likes={p.likes}/>
	)

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