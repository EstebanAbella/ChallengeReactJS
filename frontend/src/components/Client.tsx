import React, { useEffect } from 'react'

export type ClientPropsType = {
	name: string
	id: number
	setClientSelected: Function
	clientSelected: number
}

const Client = ({ name, id, setClientSelected, clientSelected }: ClientPropsType) => {
	useEffect(() => {
		const thisClient = document.getElementById(`${id}${name}`)
		if (!thisClient) return
		if (clientSelected === id) {
			thisClient.classList.add('selected')
		} else {
			thisClient.classList.remove('selected')
		}
	}, [clientSelected])

	const handleClick = () => {
		setClientSelected(id)
		const thisClient = document.getElementById(`${id}${name}`)
		if (!thisClient) return
		thisClient.classList.add('selected')
	}
	return (
		<p className={`client`} id={`${id}${name}`} onClick={handleClick}>
			{name}
		</p>
	)
}

export default Client
