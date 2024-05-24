import React, { useEffect, useState } from 'react'
import AccessConsume from '../wrappers/auth/AccessConsume'
import Layout from '../wrappers/layout/Layout'
import Clients from '../components/Clients'
import TableInboundCase from '../components/TableInboundCase'

const Conversations = () => {
	const [clientSelected, setClientSelected] = useState<number>(0)

	return (
		<AccessConsume>
			<Layout>
				<section className="conversations">
					<Clients setClientSelected={setClientSelected} clientSelected={clientSelected} />
					<TableInboundCase clientSelected={clientSelected} />
				</section>
			</Layout>
		</AccessConsume>
	)
}

export default Conversations
