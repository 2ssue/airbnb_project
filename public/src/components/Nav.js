import React, { useState, useRef, useContext, useMemo } from 'react';
import styled from 'styled-components';

import Calendar from './modals/Calendar';
import Guest from './modals/Guest';
import Price from './modals/Price';
import { filterInfoContext } from '../App';
import { visibilityType, modalButtonText, DATE_FORMAT } from '../constants';
import { changeButtonColorToMain, changeButtonColorToDefault } from './styles/change_style';
import { DefaultButton } from './styles/default_style';

function Nav() {
  const [modalVisibility, setModalVisibility] = useState('');
  const { resortFilterData } = useContext(filterInfoContext);
  const calendarRef = useRef(null);
  const guestRef = useRef(null);

  const closeModal = () => {
    setModalVisibility('');
  };

  useMemo(() => {
    console.log('navigation: ', resortFilterData);
    const { checkIn, checkOut } = resortFilterData;

    if (checkIn && checkOut) {
      changeButtonColorToMain(calendarRef.current, `${checkIn.format(DATE_FORMAT)}~${checkOut.format(DATE_FORMAT)}`);
    } else if (calendarRef.current) {
      changeButtonColorToDefault(calendarRef.current, modalButtonText.calendar);
    }
  }, [resortFilterData.checkIn, resortFilterData.checkOut]);

  useMemo(() => {
    const { Guest } = resortFilterData;

    if (Guest) {
      changeButtonColorToMain(guestRef.current, `${Guest}명`);
    } else if (guestRef.current) {
      changeButtonColorToDefault(guestRef.current, modalButtonText.guest);
    }
  }, [resortFilterData.Guest]);

  return (
    <Navigation>
      <DefaultButton ref={calendarRef} onClick={() => setModalVisibility(visibilityType.calendar)}>
        {modalButtonText.calendar}
      </DefaultButton>
      {modalVisibility === visibilityType.calendar && <Calendar close={closeModal} />}

      <DefaultButton ref={guestRef} onClick={() => setModalVisibility(visibilityType.guest)}>
        {modalButtonText.guest}
      </DefaultButton>
      {modalVisibility === visibilityType.guest && <Guest close={closeModal} />}

      <DefaultButton onClick={() => setModalVisibility(visibilityType.price)}>{modalButtonText.price}</DefaultButton>
      {modalVisibility === visibilityType.price && <Price close={closeModal} />}
    </Navigation>
  );
}

const Navigation = styled.nav`
  padding: 0.5rem;
  border-bottom: 1px solid lightgrey;
  display: flex;
`;

export default Nav;
