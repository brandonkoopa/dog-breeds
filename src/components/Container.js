import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  padding: 16px 8px 16px;
  
  @media only screen and (min-width: 600px) {
    border-radius: 8px;
    border: 1px solid #eee;
    margin: 32px auto;
    max-width: 850px;
  }
`;

export default Container;