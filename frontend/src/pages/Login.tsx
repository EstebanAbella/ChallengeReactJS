import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { doLogin } from '../redux/auth/actions'
import { RootState } from '../redux/rootReducer'
import { loggedUser } from '../utils/types/authModel'
import { ServerStatus } from '../utils/types/global'
import { useNavigate } from 'react-router-dom'
import Button, { ButtonType } from '../components/Button'

const mapStateToProps = (state: RootState) => {
	const authReducer = state.auth
	return {
		auth: authReducer.auth,
		authStatus: authReducer.authStatus
	}
}

const mapDispatchToProps = {
	doLogin
}

export type LoginPropType = {
	auth?: loggedUser
	authStatus: ServerStatus
	doLogin: (e: any) => void
}

const Login = ({ auth, authStatus, doLogin }: LoginPropType) => {
	const [form, setForm] = useState({ email: '', password: '' })
	const navigate = useNavigate()
	const [stateButton, setStateButton] = React.useState(true)

	useEffect(() => {
		if (form.email !== '' && form.password !== '') {
			setStateButton(false)
		} else {
			setStateButton(true)
		}
	}, [form])

	useEffect(() => {
		if (authStatus === ServerStatus.FETCH) {
			navigate('/conversations', { replace: true })
		}
		if (authStatus === ServerStatus.FETCH_ERROR) {
			navigate('/login', { replace: true })
		}
		if (authStatus === ServerStatus.FETCHING) {
			navigate('/login', { replace: true })
		}
	}, [authStatus])

	const handleChange = (e: React.SyntheticEvent<EventTarget>) => {
		const name = (e.target as HTMLInputElement).name
		const value = (e.target as HTMLInputElement).value
		setForm({ ...form, [name]: value })
	}

	const handleClick = () => {
		doLogin(form)
	}

	return (
		<section className="login">
			<form>
				<input type="email" name="email" value={form.email} placeholder="E-mail" required onChange={handleChange}></input>
				<input type="password" name="password" value={form.password} placeholder="Password" required onChange={handleChange}></input>
				<Button
					value={authStatus === ServerStatus.FETCHING ? 'Loading' : 'Login'}
					type={ButtonType.PRIMARY}
					onClick={handleClick}
					disabled={stateButton}
				/>
				<div style={{ height: '1em' }}>{authStatus === ServerStatus.FETCH_ERROR && <p style={{ color: 'red' }}>Usuario/Contraseña incorrecta</p>}</div>
			</form>
		</section>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
