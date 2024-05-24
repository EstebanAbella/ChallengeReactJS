import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../redux/rootReducer'
import LocalDataService from '../../services/LocalDataService'
import { useNavigate } from 'react-router-dom'

type AccessConsumePropsType = {
	children: JSX.Element | JSX.Element[]
}

const AccessConsume = ({ children }: AccessConsumePropsType): any => {
	const [canAccess, setCanAccess] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		const token = LocalDataService.getInstance().getToken()
		if (token) {
			setCanAccess(true)
		} else {
			setCanAccess(false)
			navigate('/')
		}
	}, [])

	return canAccess ? children : <div></div>
}

export default AccessConsume
