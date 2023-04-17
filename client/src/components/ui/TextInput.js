import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  margin-bottom: 1rem;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

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

const TextInput = React.forwardRef(({ label, ...props }, ref) => (
  <InputWrapper>
    {label && <InputLabel htmlFor={props.id}>{label}</InputLabel>}
    <StyledInput ref={ref} {...props} />
  </InputWrapper>
));

export default TextInput;
