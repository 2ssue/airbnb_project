import React, { useState } from 'react';
import styled from 'styled-components';

import Calender from './navigation/calender';
import Guest from './navigation/guest';
import Price from './navigation/price';

function Nav(){
    return (
        <Navigation>
            <Calender />
            <Guest />
            <Price />
        </Navigation>
    );
}

const Navigation = styled.nav `
    padding: 0.5rem;
    border-bottom: 1px solid lightgrey;
    display: flex;
    button {
        background-color: white;
        border: 1px solid lightgrey;
        border-radius: 5px;
        padding: 0.5rem 0.8rem;
        margin-right: 0.5rem;
        font-size: 0.8rem;
        &:hover {
            background-color: lightgrey;
        }
        &:focus {
            outline: none;
        }      
    }
`;

export default Nav;