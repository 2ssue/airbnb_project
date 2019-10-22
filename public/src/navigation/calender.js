import React, { useState} from 'react';
import {DayPickerRangeController} from 'react-dates';
import moment from 'moment';
import styled from 'styled-components';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

function Calender({ setVisibility, visibility }){
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focus, setFocus] = useState('startDate');

    return (
        <div>
            <button onClick={() => setVisibility(!visibility)}>날짜</button>
            {
                visibility ?
                <DatePickerWrapper>
                    <DayPickerRangeController
                        startDate={startDate}
                        endDate={endDate}
                        onDatesChange={({startDate, endDate}) => {setStartDate(startDate); setEndDate(endDate)}}
                        onFocusChange={focus => setFocus(focus)}
                        focusedInput={focus}
                        numberOfMonths={2}
                        keepOpenOnDateSelect hideKeyboardShortcutsPanel>
                    </DayPickerRangeController>
                </DatePickerWrapper>
                : ''
            }
        </div>
    );
}

const DatePickerWrapper = styled.div `
    position: fixed;
    top: 6rem;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255,255,255,0.5);
    > div{
        position: fixed;
        top: 6rem;
        margin-left: 0.5rem;
    }
`;

export default Calender;