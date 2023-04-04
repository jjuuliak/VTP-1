import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid var(--accent-grey);
  border-radius: 4px;
  color: var(--dark-grey-text);
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--primary-blue);
    outline: none;
  }
`;

const TextInput = React.forwardRef((props, ref) => {
  return <StyledInput ref={ref} {...props} />;
});

export default TextInput;