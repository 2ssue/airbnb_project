import styled from 'styled-components';

export const colors = {
  main: 'rgb(243, 156, 18)',
  mainAlpha: 'rgb(243, 156, 18, 0.5)',
};

export const size = {
  borderRadius: '5px',
  modalMarginTop: '6rem',
};

export const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const DefaultButton = styled.button`
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 0.5rem 0.8rem;
  margin-right: 0.5rem;
  font-size: 0.8rem;
  cursor: pointer;
  &:hover {
    ${props => (props.disabled ? 'cursor: default;' : 'background-color: lightgrey;')}
  }
  &:focus {
    outline: none;
  }
`;

export const ModalButtonContainer = styled.div`
  padding-right: 0.9rem;
  padding-left: 1.4rem;
  display: flex;
  justify-content: space-between;
`;
