import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import Calender from './modals/Calender';
import Guest from './modals/Guest';
import Price from './modals/Price';

function Nav() {
  const [modalVisibility, setModalVisibility] = useState('');
  const calenderRef = useRef(null);
  const closeModal = () => {
    setModalVisibility('');
  };

  return (
    <Navigation>
      <Button ref={calenderRef} onClick={() => setModalVisibility('calender')}>
        날짜
      </Button>
      {modalVisibility === 'calender' && <Calender close={closeModal} reference={calenderRef} />}

      <Button onClick={() => setModalVisibility('guest')}>인원</Button>
      {modalVisibility === 'guest' && <Guest close={closeModal} />}

      <Button onClick={() => setModalVisibility('price')}>가격</Button>
      {modalVisibility === 'price' && <Price close={closeModal} />}
    </Navigation>
  );
}

const Navigation = styled.nav`
  padding: 0.5rem;
  border-bottom: 1px solid lightgrey;
  display: flex;
`;

export const Button = styled.button`
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 0.5rem 0.8rem;
  margin-right: 0.5rem;
  font-size: 0.8rem;
  &:hover {
    ${props => (props.disabled ? '' : 'background-color: lightgrey; cursor: pointer;')}
  }
  &:focus {
    outline: none;
  }
`;

export default Nav;
