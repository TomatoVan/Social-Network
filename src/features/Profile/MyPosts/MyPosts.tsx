import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {SubmitHandler, useForm} from 'react-hook-form';

type PostType = {
	id: number
	message: string
	likes: number
}

type postsDataType = {
	postsData: Array<PostType>
	newPostText: string
	addPost: (newPost: string) => void
}

type FormTypes = {
	message: string,
};

const MyPosts: React.FC<postsDataType> = (props) => {

	let postsElements = props.postsData.map((p) => <Post key={p.id} message={p.message} likes={p.likes}/>)


	const addPostCallback = (newPost: string) => {
		props.addPost(newPost)
	}


	const {
		register,
		handleSubmit,
		formState: {errors},
		reset
	} = useForm<FormTypes>({mode: 'onSubmit'});
	const onSubmit: SubmitHandler<FormTypes> = (data) => {
		console.log(data)
		reset();

		addPostCallback(data.message)
	};

	return (<div className={s.postsBlock}>
		<h3>My posts</h3>
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className={s.postsForm}>
				<div>
					<textarea className={s.postTextField} {...register('message', {required: 'The field is required'})} placeholder="Message"/>
					<div>
						{errors?.message && <p className={s.error}>{errors?.message?.message || 'Error!'}</p>}
					</div>
				</div>
				<div>
					<input className={s.submitBtn} type="submit" value="Add post"/>
				</div>
			</form>
		</div>
		<div className={s.posts}>
			{postsElements}
		</div>
	</div>);
}

export default MyPosts;