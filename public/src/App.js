import React, { useState, useEffect, useReducer, useMemo } from 'react';
import logo from './logo.svg';
import styled from 'styled-components';

import Nav from './components/Nav';
import Resorts from './components/Resorts';
import { initialData } from './util/utils';
import { resortFilterState, resortFilterReducer } from './components/util/reducers';

export const filterInfoContext = React.createContext();

function App() {
  const [resortFilterData, dispatchFilter] = useReducer(resortFilterReducer, resortFilterState);
  const [resorts, setResorts] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    initialData('/resorts', setResorts);
    setLoad(true);
  }, []);

  useMemo(() => {
    console.log('App: ', resortFilterData);
  }, [resortFilterData]);

  return (
    <div>
      <Header>
        <Logo src={logo} alt="logo" />
      </Header>
      <filterInfoContext.Provider value={{ dispatchFilter, resortFilterData }}>
        <Nav />
      </filterInfoContext.Provider>
      <Resorts resorts={resorts} load={load} />
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
