import React, { useState, useEffect, useContext } from 'react';
import { DayPickerRangeController } from 'react-dates';
import moment from 'moment';
import styled from 'styled-components';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { colors } from '../../styles/default_style';
import { changeButtonColorToMain } from '../../styles/change_style';

import { searchInfoContext } from '../../App';
import { Button } from '../Nav';

function Calender({ close, reference }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focus, setFocus] = useState('startDate');

  const { setCheckIn, setCheckOut } = useContext(searchInfoContext);

  useEffect(() => {
    if (startDate) {
      setEndDate(null);
      setFocus('endDate');
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate) {
      setFocus('startDate');
    }
  }, [endDate]);

  return (
    <Background onClick={close}>
      <DatePickerWrapper>
        <DayPickerRangeController
          keepOpenOnDateSelect
          hideKeyboardShortcutsPanel
          noBorder
          startDate={startDate}
          endDate={endDate}
          focusedInput={focus}
          numberOfMonths={2}
          onDatesChange={({ startDate, endDate }) => {
            setStartDate(startDate);
            setEndDate(endDate);
          }}
          onFocusChange={focus => setFocus(focus)}
          isOutsideRange={day => day.isBefore(moment())}
        ></DayPickerRangeController>
        <ButtonContainer>
          <Button
            onClick={e => {
              setStartDate(null);
              setEndDate(null);
              setFocus('startDate');
              e.stopPropagation();
            }}
            disabled={startDate ? false : true}
          >
            삭제
          </Button>
          <Button
            onClick={e => {
              setCheckIn(startDate);
              setCheckOut(endDate);
              changeButtonColorToMain(
                reference.current,
                `${startDate.format('YYYY[/]MM[/]DD')} ~ ${endDate.format('YYYY[/]MM[/]DD')}`,
              );
            }}
            disabled={endDate ? false : true}
          >
            저장
          </Button>
        </ButtonContainer>
      </DatePickerWrapper>
    </Background>
  );
}

const ButtonContainer = styled.div`
  padding-right: 0.9rem;
  padding-left: 1.4rem;
  display: flex;
  justify-content: space-between;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const DatePickerWrapper = styled.div`
  position: absolute;
  top: 6rem;
  margin-left: 0.5rem;
  padding-top: 0.5rem;
  background-color: white;
  height: 22rem;
  border-radius: 5px;

  .CalendarDay__selected_span {
    background: ${colors.mainAlpha};
    color: white;
    border: none;
  }
  .CalendarDay__selected {
    background: ${colors.main};
    color: white;
    border: none;
  }
  .CalendarDay__selected:hover {
    background: orange;
    color: white;
  }
  .CalendarDay__hovered_span:hover,
  .CalendarDay__hovered_span {
    background: ${colors.mainAlpha};
    border: none;
    color: inherit;
  }
`;

export default Calender;
