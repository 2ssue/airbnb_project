import React, { useState, useReducer } from 'react';
import styled from 'styled-components';
import { size, ModalBackground, colors, ModalButtonContainer, DefaultButton } from '../styles/default_style';

const guestFilterState = {
  adult: 0,
  child: 0,
  kid: 0,
};

const guestFilterReducer = (state, action) => {
  switch (action.type) {
    case 'adult':
      return;
    case 'child':
      return;
    case 'kid':
      return;
    case 'reset':
      return { adult: 0, child: 0, kid: 0 };
  }
};

function Guest({ close }) {
  const [guestFilterData, dispatchGuestFilter] = useReducer(guestFilterReducer, guestFilterState);

  return (
    <ModalBackground onClick={close}>
      <GuestWrapper>
        {guestConterElement()}
        <ModalButtonContainer>
          <DefaultButton>삭제</DefaultButton>
          <DefaultButton>저장</DefaultButton>
        </ModalButtonContainer>
      </GuestWrapper>
    </ModalBackground>
  );
}

const guestConterElement = () => {
  const texts = ['성인', '어린이(2-12세)', '유아(2세 미만)'];
  return texts.map(text => {
    const [counter, setCounter] = useState(0);

    return (
      <CounterWrapper>
        <span>{text}</span>
        <Button
          onClick={e => {
            setCounter(current => {
              if (current < 1) return current;
              return current - 1;
            });
            e.stopPropagation();
          }}
        >
          -
        </Button>
        <span>{counter}</span>
        <Button
          onClick={e => {
            setCounter(current => current + 1);
            e.stopPropagation();
          }}
        >
          +
        </Button>
      </CounterWrapper>
    );
  });
};

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
