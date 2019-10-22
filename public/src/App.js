import React from 'react';
import logo from './logo.svg';
import styled from 'styled-components';

import Nav from './components/Nav';

function App() {
	return (
		<div>
			<Header>
				<Logo src={logo} alt="logo" />
			</Header>
			<Nav />
		</div>
	);
}

const Logo = styled.img`
	width: 2rem;
	height: 2rem;
	margin: 0.5rem;
`;

const Header = styled.header`
	border-bottom: 1px solid lightgrey;
`;

export default App;
