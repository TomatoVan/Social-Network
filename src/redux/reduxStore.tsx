import {applyMiddleware, combineReducers, createStore} from "redux";
import {ProfileActionsType, profileReducer} from "./profileReducer";
import {dialogActionsType, dialogsReducer} from "./dialogsReducer";
import {sidebarReducer} from "./sidebarReducer";
import {UsersActionsType, usersReducer} from "./usersReducer";
import {authReducer, AuthUserActionsType} from "./authReducer";
import thunk, {ThunkAction} from "redux-thunk";
import {AppActionsTypes, appReducer} from "./appReducer";

let rootReducer = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	sidebar: sidebarReducer,
	usersPage: usersReducer,
	auth: authReducer,
	app: appReducer

})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionsType = AuthUserActionsType | AppActionsTypes | dialogActionsType | ProfileActionsType | UsersActionsType
export type AppThunk<ReturnType = void> = ThunkAction<void, AppRootStateType, unknown, AppActionsType>

export let store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store