import React from 'react'
import Conversations from './pages/Conversations'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'

function App() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="*" element={<Login />} />
			<Route path="/conversations" element={<Conversations />} />
		</Routes>
	)
}

export default App
