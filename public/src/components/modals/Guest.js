import React, { useReducer, useContext } from 'react';
import styled from 'styled-components';
import { size, ModalBackground, colors, ModalButtonContainer, DefaultButton } from '../styles/default_style';
import { filterInfoContext } from '../../App';

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

  return (
    <ModalBackground onClick={close}>
      <GuestWrapper>
        <CounterWrapper>
          <span>성인</span>
          <Button
            onClick={e => {
              if (guestFilterData.adult > 0) {
                dispatchGuestFilter({ type: 'adult', count: guestFilterData.adult - 1 });
              }
              e.stopPropagation();
            }}
          >
            -
          </Button>
          <span>{guestFilterData.adult}</span>
          <Button
            onClick={e => {
              dispatchGuestFilter({ type: 'adult', count: guestFilterData.adult + 1 });
              e.stopPropagation();
            }}
          >
            +
          </Button>
        </CounterWrapper>
        <CounterWrapper>
          <span>어린이(2-12세)</span>
          <Button
            onClick={e => {
              if (guestFilterData.child > 0) {
                dispatchGuestFilter({ type: 'child', count: guestFilterData.child - 1 });
              }
              e.stopPropagation();
            }}
          >
            -
          </Button>
          <span>{guestFilterData.child}</span>
          <Button
            onClick={e => {
              if (guestFilterData.adult === 0) {
                dispatchGuestFilter({ type: 'adult', count: 1 });
              }
              dispatchGuestFilter({ type: 'child', count: guestFilterData.child + 1 });
              e.stopPropagation();
            }}
          >
            +
          </Button>
        </CounterWrapper>
        <CounterWrapper>
          <span>유아(2세 미만)</span>
          <Button
            onClick={e => {
              if (guestFilterData.kid > 0) {
                dispatchGuestFilter({ type: 'kid', count: guestFilterData.kid - 1 });
              }
              e.stopPropagation();
            }}
          >
            -
          </Button>
          <span>{guestFilterData.kid}</span>
          <Button
            onClick={e => {
              if (guestFilterData.adult === 0) {
                dispatchGuestFilter({ type: 'adult', count: 1 });
              }
              dispatchGuestFilter({ type: 'kid', count: guestFilterData.kid + 1 });
              e.stopPropagation();
            }}
          >
            +
          </Button>
        </CounterWrapper>
        <ModalButtonContainer>
          <DefaultButton
            onClick={e => {
              dispatchGuestFilter({ type: 'reset' });
              e.stopPropagation();
            }}
          >
            삭제
          </DefaultButton>
          <DefaultButton
            onClick={() => {
              const { adult, child, kid } = guestFilterData;
              const totalGuest = adult + child + kid * 0.1;

              dispatchFilter({ type: 'guest', guest: totalGuest });
            }}
          >
            저장
          </DefaultButton>
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
