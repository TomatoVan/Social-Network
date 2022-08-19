import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {ProfileActionsType, profileReducer} from '../features/Profile/profileReducer';
import {DialogActionsType, dialogsReducer} from '../features/Dialogs/dialogsReducer';

import {UsersActionsType, usersReducer} from '../features/Users/usersReducer';
import {authReducer, AuthUserActionsType} from '../features/Login/authReducer';
import thunk, {ThunkAction} from 'redux-thunk';
import {AppActionsTypes, appReducer} from './appReducer';

let rootReducer = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer,
	auth: authReducer,
	app: appReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionsType = AuthUserActionsType | AppActionsTypes | DialogActionsType | ProfileActionsType | UsersActionsType
export type AppThunk<ReturnType = void> = ThunkAction<void, AppRootStateType, unknown, AppActionsType>

//for dev
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)));
// export let store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store