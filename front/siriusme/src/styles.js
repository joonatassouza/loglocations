import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  h3 {
    text-align: center;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 40px;
    width: 70%;

    @media (max-width:768px)  {
      width: 100%;
    }

    li {
      margin-top: 5px;
      display: flex;
      flex-direction: row;
      width: 100%;

      strong {
        flex: 0.2;
        margin: 5px;
      }

      span {
        flex: 0.2;
        margin: 5px;
      }
    }
  }
`;
