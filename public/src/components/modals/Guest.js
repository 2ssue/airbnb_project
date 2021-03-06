import React, { useReducer, useContext } from 'react';
import styled from 'styled-components';
import { size, ModalBackground, colors, ModalButtonContainer, DefaultButton } from '../styles/default_style';
import { filterInfoContext } from '../../App';
import CounterSection from './CounterButton';

const guestFilterState = {
  adult: 0,
  child: 0,
  kid: 0,
};

const guestFilterReducer = (state, action) => {
  switch (action.type) {
    case 'adult':
      return { ...state, adult: action.count };
    case 'child':
      return { ...state, child: action.count };
    case 'kid':
      return { ...state, kid: action.count };
    case 'reset':
      return { adult: 0, child: 0, kid: 0 };
  }
};

function Guest({ close }) {
  const [guestFilterData, dispatchGuestFilter] = useReducer(guestFilterReducer, guestFilterState);
  const { dispatchFilter } = useContext(filterInfoContext);
  const counterConstants = [
    { title: '성인', type: 'adult' },
    { title: '어린이(2-12세)', type: 'child' },
    { title: '유아(2세 미만)', type: 'kid' },
  ];

  const resetGuestFilter = e => {
    e.stopPropagation();
    dispatchFilter({ type: 'reset' });
  };

  const saveGuestFilter = e => {
    const { adult, child, kid } = guestFilterData;
    const totalGuest = adult + child + kid * 0.1;

    dispatchFilter({ type: 'guest', guest: totalGuest });
  };

  return (
    <ModalBackground onClick={close}>
      <GuestWrapper>
        <CounterSection
          counters={counterConstants}
          guestFilterData={guestFilterData}
          dispatchGuestFilter={dispatchGuestFilter}
        ></CounterSection>
        <ModalButtonContainer>
          <DefaultButton onClick={resetGuestFilter}>삭제</DefaultButton>
          <DefaultButton onClick={saveGuestFilter}>저장</DefaultButton>
        </ModalButtonContainer>
      </GuestWrapper>
    </ModalBackground>
  );
}

const CounterWrapper = styled.div`
  margin: 2rem 0;
  span:first-child {
    font-weight: bold;
    display: inline-block;
    width: 15rem;
  }
  span {
    margin: 0 1rem;
  }
`;

const GuestWrapper = styled.div`
  position: absolute;
  top: ${size.modalMarginTop};
  margin-left: 4.3rem;
  background-color: white;
  padding: 1rem;
  border-radius: ${size.borderRadius};
`;

const Button = styled.button`
  border-radius: 1rem;
  width: 2rem;
  height: 2rem;
  background-color: white;
  border: 2px solid ${colors.mainAlpha};
  cursor: pointer;
  &:hover {
    border-color: ${colors.main};
  }
  &:focus {
    outline: none;
  }
`;

export default Guest;
