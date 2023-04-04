import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: var(--primary-blue);
  color: white;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--secondary-blue);
  }

  &:disabled {
    background-color: var(--accent-grey);
    cursor: not-allowed;
  }
`;

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;