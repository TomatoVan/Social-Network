import React from 'react';
import {sendMessage} from './dialogsReducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../../common/components/AuthRedirect/withAuthRedirect';
import {AppRootStateType} from '../../app/store';
import {compose} from 'redux';


let mapStateToProps = (state: AppRootStateType): any => {
	return {
		dialogsPage: state.dialogsPage,
	}
}

export default compose<React.ComponentType>(
	connect(mapStateToProps, {sendMessage}),
	withAuthRedirect
)(Dialogs);
