import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/default_style';

function CounterSection({ counters, guestFilterData, dispatchGuestFilter }) {
  return counters.map(data => {
    return (
      <CounterWrapper>
        <span>{data.title}</span>
        <CounterButton
          onClick={e => {
            if (guestFilterData[`${data.type}`] > 0) {
              dispatchGuestFilter({ type: data.type, count: guestFilterData[`${data.type}`] - 1 });
            }
            e.stopPropagation();
          }}
        >
          -
        </CounterButton>
        <span>{guestFilterData[`${data.type}`]}</span>
        <CounterButton
          onClick={e => {
            if (guestFilterData['adult'] === 0) {
              dispatchGuestFilter({ type: 'adult', count: 1 });
            }
            dispatchGuestFilter({ type: data.type, count: guestFilterData[`${data.type}`] + 1 });
            e.stopPropagation();
          }}
        >
          +
        </CounterButton>
      </CounterWrapper>
    );
  });
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

const CounterButton = styled.button`
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

export default CounterSection;
