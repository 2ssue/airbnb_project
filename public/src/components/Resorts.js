import React from 'react';
import styled from 'styled-components';

function Resorts({ resorts, load }) {
  let resortList = 'loading..';

  if (load) {
    resortList = resorts.map(resort => (
      <List key={resort.name}>
        <Photo url={resort.photo_url} />
        <div>
          <h2>{resort.name}</h2>
          <InfoContainer>
            <strong>남은 방</strong> {resort.possible_room - resort.booked}
            <strong> 가격</strong> {resort.price}
            <strong> 숙박 가능 인원</strong> {resort.possible_guest}(성인.유아) {/* //ㅠㅠ DB바꿔야할듯 */}
          </InfoContainer>
        </div>
      </List>
    ));
  }
  return (
    <ListContainer>
      <h1>숙소 {resorts.length}개</h1>
      {resortList}
    </ListContainer>
  );
}

const ListContainer = styled.div`
  display: block;
  flex-flow: wrap;
  margin: 2rem;
`;

const List = styled.li`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2rem;
  padding: 1rem;
  min-width: 15rem;
  min-height: 20rem;
  border: 1px solid lightgrey;
  border-radius: 10px;
  h2 {
    margin: 0;
    margin-bottom: 2rem;
  }
`;

const InfoContainer = styled.div`
  color: gray;
`;

const Photo = styled.img.attrs(props => ({
  src: `${props.url}`,
}))`
  height: 20rem;
  margin-right: 1rem;
`;

export default Resorts;
