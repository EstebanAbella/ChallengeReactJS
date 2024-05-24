import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../redux/rootReducer'
import { InboundCaseReducerPropsType } from '../utils/types/inboundCase'
import { getInboundCase } from '../redux/inboundCase/actions'

const mapStateToProps = (state: RootState) => {
	const inboundCaseReducer = state.inboundCase

	return {
		inboundCase: inboundCaseReducer.inboundCase,
		inboundCaseStatus: inboundCaseReducer.inboundCaseStatus
	}
}

const mapDispatchToProps = {
	getInboundCase
}

type ValidatorProps = {
	getInboundCase: Function
	clientSelected: number
} & InboundCaseReducerPropsType

const TableInboundCase = ({ inboundCase, inboundCaseStatus, getInboundCase, clientSelected }: ValidatorProps) => {
	const [date, setDate] = useState({ dateStart: '2021-03-01', dateEnd: '2024-05-20' })

	useEffect(() => {
		if (clientSelected !== 0) {
			getInboundCase(clientSelected, date.dateStart, date.dateEnd)
		}
	}, [clientSelected, date])

	const handleChange = (e: React.SyntheticEvent<EventTarget>) => {
		const name = (e.target as HTMLInputElement).name
		const value = (e.target as HTMLInputElement).value
		setDate({ ...date, [name]: value })
		console.log(date)
	}

	return (
		<section className="tableInboundCase">
			<section className="dateContainer">
				<input type="date" id="start" name="dateStart" value={date.dateStart} min="2018-01-01" max="2024-05-24" onChange={handleChange} />
				<input type="date" id="end" name="dateEnd" value={date.dateEnd} min="2018-01-01" max="2024-05-24" onChange={handleChange} />
			</section>
			<table>
				<thead>
					<tr>
						<th scope="col">Gestionado</th>
						<th scope="col">Id caso</th>
						<th scope="col">Telefono</th>
						<th scope="col">Dni</th>
						<th scope="col">Grupo</th>
						<th scope="col">Orden</th>
						<th scope="col">Lllamada</th>
						<th scope="col">Estado</th>
					</tr>
				</thead>
				<tbody>
					{inboundCase ? (
						inboundCase?.map((data) => (
							<tr key={data.id}>
								<>
									<td className="redColor">{data.last_updated}</td>
									<td>{data.id}</td>
									<td>{data.phone}</td>
									<td className="redColor">{data.extra_metadata.dni ? data.extra_metadata.dni : '-'}</td>
									<td className="redColor">{data.extra_metadata.grupo ? data.extra_metadata.grupo : '-'}</td>
									<td className="redColor">{data.extra_metadata.orden ? data.extra_metadata.orden : '-'}</td>
									<td className="redColor">{data.case_duration}</td>
									<td className="blueColor">{data.case_result.name}</td>
								</>
							</tr>
						))
					) : (
						<tr>
							<>
								<td className="redColor">{'-'}</td>
								<td>{'-'}</td>
								<td>{'-'}</td>
								<td className="redColor">{'-'}</td>
								<td className="redColor">{'-'}</td>
								<td className="redColor">{'-'}</td>
								<td className="redColor">{'-'}</td>
								<td className="blueColor">{'-'}</td>
							</>
						</tr>
					)}
				</tbody>
			</table>
		</section>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(TableInboundCase)
