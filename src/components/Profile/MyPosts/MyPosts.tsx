import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import f from "../../../Login/Login.module.css"
import Post from "./Post/Post";
import {SubmitHandler, useForm} from "react-hook-form";

type PostType = {
	id: number
	message: string
	likes: number
}

type postsDataType = {
	postsData: Array<PostType>
	newPostText: string
	/*changeNewText: (event: string) => void*/
	addPost: (newPost: string) => void

}

const MyPosts: React.FC<postsDataType> = (props) => {

	let postsElements = props.postsData.map((p) => <Post key={p.id} message={p.message} likes={p.likes}/>)


	const addPostCallback = (newPost: string) => {
		props.addPost(newPost)
		/*props.dispatch(addPostAC())*/
	}

	/*	const changeNewTextCallback = (event: ChangeEvent<HTMLTextAreaElement>) => {
			props.changeNewText(event.currentTarget.value)
			/!*props.dispatch(changeNewTextAC(e.currentTarget.value))*!/
		}*/


	type Inputs = {
		message: string,
	};

	const {
		register,
		handleSubmit,
		formState: {errors},
		reset
	} = useForm<Inputs>({mode: "onSubmit"});
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data)
		reset();

		addPostCallback(data.message)
	};

	return (<div className={s.postsBlock}>
		<h3>My posts</h3>
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className={s.postsForm}>
				{/*Message INPUT*/}
				<div>
					<textarea className={s.postTextField} {...register("message", {required: "The field is required"})} placeholder="Message"/>
					<div>
						{errors?.message && <p className={f.error}>{errors?.message?.message || "Error!"}</p>}
					</div>
				</div>
				{/*SUBMIT INPUT*/}
				<div>
					<input className={s.submitBtn} type="submit" value="Add post"/>
				</div>

			</form>
			{/*	<div>
				<textarea onChange={changeNewTextCallback} value={props.newPostText}/>
			</div>
			<div>
				<button onClick={addPostCallback}>Add post</button>
			</div>*/}
		</div>
		<div className={s.posts}>
			{postsElements}
		</div>
	</div>);
}

export default MyPosts;