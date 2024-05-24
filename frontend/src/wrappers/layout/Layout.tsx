import React, { useState } from 'react'

type LayoutPropsType = {
	children: JSX.Element | JSX.Element[]
}

const Layout = ({ children }: LayoutPropsType): JSX.Element => {
	return <section className={'layout'}>{children}</section>
}

export default Layout
