import { PropsWithChildren, useEffect } from 'react'
import { RootState } from '../../redux/rootReducer'
import LocalDataService from '../../services/LocalDataService'
import { connect } from 'react-redux'
import ApiService from '../../services/ApiService'
import { AuthReducerPropsType } from '../../utils/types/authModel'
import React from 'react'

const mapStateToProps = (state: RootState) => {
	const authReducer = state.auth
	return {
		authReducer: authReducer
	}
}

const mapDispatchToProps = {}

export type SessionProviderProps = PropsWithChildren<{
	authReducer: AuthReducerPropsType
}>

const SessionProvider = ({ authReducer, children }: SessionProviderProps) => {
	useEffect(() => {
		const token = LocalDataService.getInstance().getToken()
		if (token) {
			ApiService.setToken(token)
		}
	}, [])

	return <>{children}</>
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionProvider)
