import React, { useState, useEffect, useContext, useMemo } from 'react';
import { DayPickerRangeController } from 'react-dates';
import moment from 'moment';
import styled from 'styled-components';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { colors } from '../../styles/default_style';

import { filterInfoContext } from '../../App';
import { Button } from '../Nav';
import { START_DATE, END_DATE, DATE_FORMAT } from '../../constants';

function Calendar({ close }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focus, setFocus] = useState(START_DATE);
  const { dispatchFilter, resortFilterData } = useContext(filterInfoContext);

  useMemo(() => {
    const { checkIn, checkOut } = resortFilterData;
    console.log('calendar: ', resortFilterData);
    if (checkIn && checkOut) {
      setStartDate(moment(checkIn));
      setEndDate(moment(checkOut));
    }
  }, [resortFilterData]);

  useEffect(() => {
    if (startDate) {
      setFocus(END_DATE);
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate) {
      setFocus(START_DATE);
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
              dispatchFilter({ type: 'date', checkIn: null, checkOut: null });
              setFocus(START_DATE);
              e.stopPropagation();
            }}
            disabled={startDate ? false : true}
          >
            삭제
          </Button>
          <Button
            onClick={() => {
              dispatchFilter({
                type: 'date',
                checkIn: startDate.format(DATE_FORMAT),
                checkOut: endDate.format(DATE_FORMAT),
              });
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

export default Calendar;
