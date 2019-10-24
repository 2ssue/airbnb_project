import React, { useState, useEffect, useReducer, useMemo } from 'react';
import logo from './logo.svg';
import styled from 'styled-components';

import Nav from './components/Nav';
import Resorts from './components/Resorts';
import { initialData } from './util/utils';

export const filterInfoContext = React.createContext();

const resortFilterState = {
  checkIn: null,
  checkOut: null,
  Guest: null,
  Price: null,
};

const resortFilterReducer = (state, action) => {
  switch (action.type) {
    case 'date':
      return { ...state, checkIn: action.checkIn, checkOut: action.checkOut };
    case 'guest':
      return { ...state, Guest: action.guest };
    case 'price':
      return { ...state, Price: action.price };
  }
};

function App() {
  const [resortFilterData, dispatchFilter] = useReducer(resortFilterReducer, resortFilterState);
  const [resorts, setResorts] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    initialData('/resorts', setResorts);
    setLoad(true);
  };

  useEffect(() => {
    initialResortData();
  }, []);

  useMemo(() => {
    console.log('App: ', resortFilterData);
  }, [resortFilterData]);

  return (
    <filterInfoContext.Provider value={{ dispatchFilter, resortFilterData }}>
      <Header>
        <Logo src={logo} alt="logo" />
      </Header>
      <Nav />
      <Resorts resorts={resorts} load={load} />
    </filterInfoContext.Provider>
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
