import React from 'react';
import styled from 'styled-components';

const ErrorWrapper = styled.div`
  background-color: var(--alert-red);
  color: white;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const Error = ({ children, ...props }) => {
  return <ErrorWrapper {...props}>{children}</ErrorWrapper>;
};

export default Error;