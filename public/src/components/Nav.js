import React, { useState, useRef, useContext, useMemo } from 'react';
import styled from 'styled-components';

import Calender from './modals/Calender';
import Guest from './modals/Guest';
import Price from './modals/Price';
import { filterInfoContext } from '../App';
import { changeButtonColorToMain, changeButtonColorToDefault } from '../styles/change_style';

const visibilityType = {
  calendar: 'calendar',
  guest: 'guest',
  price: 'price',
};

function Nav() {
  const [modalVisibility, setModalVisibility] = useState('');
  const { resortFilterData } = useContext(filterInfoContext);
  const calendarRef = useRef(null);

  const closeModal = () => {
    setModalVisibility('');
  };

  useMemo(() => {
    console.log('navigation: ', resortFilterData);
    const { checkIn, checkOut } = resortFilterData;

    if (checkIn && checkOut) {
      changeButtonColorToMain(calendarRef.current, `${checkIn}~${checkOut}`);
    } else if (calendarRef.current) {
      changeButtonColorToDefault(calendarRef.current, '날짜');
    }
  }, [resortFilterData.checkIn, resortFilterData.checkOut]);

  return (
    <Navigation>
      <Button ref={calendarRef} onClick={() => setModalVisibility(visibilityType.calendar)}>
        날짜
      </Button>
      {modalVisibility === visibilityType.calendar && <Calender close={closeModal} />}

      <Button onClick={() => setModalVisibility(visibilityType.guest)}>인원</Button>
      {modalVisibility === visibilityType.guest && <Guest close={closeModal} />}

      <Button onClick={() => setModalVisibility(visibilityType.price)}>가격</Button>
      {modalVisibility === visibilityType.price && <Price close={closeModal} />}
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
  cursor: pointer;
  &:hover {
    ${props => (props.disabled ? 'cursor: default;' : 'background-color: lightgrey;')}
  }
  &:focus {
    outline: none;
  }
`;

export default Nav;
