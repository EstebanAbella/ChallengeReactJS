import React from 'react'

export enum ButtonType {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
	TERTIARY = 'tertiary',
	DANGER = 'danger',
	WARNING = 'warning',
	SUCCESS = 'success',
	INFO = 'info',
	LIGHT = 'light',
	DARK = 'dark',
	LINK = 'link'
}

const Button = ({
	value = '',
	type = ButtonType.PRIMARY,
	disabled = false,
	onClick = () => {},
	isSubmit = false,
	icon = ''
}: {
	value?: string | JSX.Element
	type?: ButtonType
	disabled?: boolean
	onClick?: (e: any) => void
	isSubmit?: boolean
	icon?: string
}) => {
	return (
		<button disabled={disabled} onClick={onClick} type={isSubmit ? 'submit' : 'button'} className={`Button ${type}`}>
			{value}
			<span className={icon}></span>
		</button>
	)
}

export default Button
