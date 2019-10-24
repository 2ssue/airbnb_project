import React, { useState, useEffect, useContext, useMemo } from 'react';
import { DayPickerRangeController } from 'react-dates';
import moment from 'moment';
import styled from 'styled-components';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { colors, ModalBackground, size, DefaultButton, ModalButtonContainer } from '../styles/default_style';

import { filterInfoContext } from '../../App';
import { START_DATE, END_DATE } from '../../constants';

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
    <ModalBackground onClick={close}>
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
        <ModalButtonContainer>
          <DefaultButton
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
          </DefaultButton>
          <DefaultButton
            onClick={() => {
              dispatchFilter({
                type: 'date',
                checkIn: startDate,
                checkOut: endDate,
              });
            }}
            disabled={endDate ? false : true}
          >
            저장
          </DefaultButton>
        </ModalButtonContainer>
      </DatePickerWrapper>
    </ModalBackground>
  );
}

const DatePickerWrapper = styled.div`
  position: absolute;
  top: ${size.modalMarginTop};
  margin-left: 0.5rem;
  padding-top: 0.5rem;
  background-color: white;
  height: 22rem;
  border-radius: ${size.borderRadius};

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
