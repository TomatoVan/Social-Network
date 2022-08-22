import {applyMiddleware, combineReducers, compose, createStore} from 'redux';

import {UsersActionsType, usersReducer} from '../features/users/usersReducer';
import {authReducer, AuthUserActionsType} from '../features/login/authReducer';
import thunk, {ThunkAction} from 'redux-thunk';
import {AppActionsTypes, appReducer} from './appReducer';
import {ProfileActionsType, profileReducer} from '../features/profile/profileReducer';
import {DialogActionsType, dialogsReducer} from '../features/dialogs/dialogsReducer';

let rootReducer = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer,
	auth: authReducer,
	app: appReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AllAppActionsType = AuthUserActionsType | AppActionsTypes | DialogActionsType | ProfileActionsType | UsersActionsType
export type AppThunkType = ThunkAction<void, AppRootStateType, unknown, AllAppActionsType>


//for dev
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
// export let store = createStore(rootReducer, applyMiddleware(thunk))

