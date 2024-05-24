import React, { useEffect } from 'react'
import { RootState } from '../redux/rootReducer'
import { ClientsReducerPropsType, clientListType } from '../utils/types/clientType'
import { connect } from 'react-redux'
import Client from './Client'
import { getClients } from '../redux/client/actions'

const mapStateToProps = (state: RootState) => {
	const clientsReducer = state.clients

	return {
		clients: clientsReducer.clients,
		clientsStatus: clientsReducer.clientsStatus
	}
}

const mapDispatchToProps = {
	getClients
}

type ValidatorProps = {
	getClients: Function
	setClientSelected: Function
	clientSelected: number
} & ClientsReducerPropsType

const Clients = ({ getClients, clients, clientsStatus, setClientSelected, clientSelected }: ValidatorProps) => {
	useEffect(() => {
		getClients()
		if (clients) {
			setClientSelected(clients[0]?.id)
		}
	}, [])
	return (
		<section className="clientsContainer">
			<div className="clients">
				<h2>Clientes</h2>
				{clients?.map((data: clientListType) => (
					<Client name={data.name} id={data.id} key={data.id} setClientSelected={setClientSelected} clientSelected={clientSelected} />
				))}
			</div>
		</section>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients)
