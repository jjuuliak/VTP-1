// src/components/PageContainer.js
import styled from 'styled-components';

const PageContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
width: 100%;
padding: 2rem;
gap: 1rem;
@media (max-width: 768px) {
  flex-direction: column;
}
`;

export default PageContainer;