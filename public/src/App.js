import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import styled from 'styled-components';

import Nav from './components/Nav';
import Resorts from './components/Resorts';

export const searchInfoContext = React.createContext();

function App() {
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [guest, setGuest] = useState();
  const [price, setPrice] = useState();
  const [resorts, setResorts] = useState([]);
  const [load, setLoad] = useState(false);

  const initialResortData = async () => {
    const response = await fetch('/resorts');
    const initialData = (await response.json()).data;

    if (!initialData) return;
    setResorts(initialData);
    setLoad(true);
  };

  useEffect(() => {
    initialResortData();
  }, []);

  return (
    <searchInfoContext.Provider value={{ setCheckIn, setCheckOut, setGuest, setPrice }}>
      <Header>
        <Logo src={logo} alt="logo" />
      </Header>
      <Nav />
      <Resorts resorts={resorts} load={load} />
    </searchInfoContext.Provider>
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
