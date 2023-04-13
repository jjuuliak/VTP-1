import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faGavel, faChartLine, faChartPie, faBalanceScale, faHandHoldingUsd, faUniversity, faFileInvoiceDollar, faUsers, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import Card from './ui/Card';
import PageContainer from './ui/PageContainer';

const Heading = styled.h2`
  margin-top: 1.5em;
  margin-bottom: 0.5em;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 1em;
  margin-bottom: 1em;
`;
const PlanLink = styled(Link)`
  color: var(--primary-blue);
  text-decoration: none;
  transition: color 0.2s;
  &:hover,
  &:focus {
    color: var(--secondary-blue);
    text-decoration: underline;
  }
  display: flex;
  align-items: center;
`;

const InspectionItem = styled.li`
  cursor: pointer;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  &:hover {
    background-color: var(--light-background);
  }
  &:hover ${PlanLink} {
    color: var(--secondary-blue);
  }
`;
const Spacer = styled.div`
  width: 1rem;
  @media (max-width: 768px) {
    width: 0;
    height: 1rem;
  }
`;

const Homepage = () => {
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [inspectionPlans, setInspectionPlans] = useState([]);
  const [inspections, setInspections] = useState([]);

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/inspection_subjects');
        const data = await response.json();
        setInspections(data);
      } catch (error) {
        console.error('Error fetching inspections:', error);
      }
    };

    fetchInspections();
  }, []);

  const handleInspectionClick = async (inspection) => {
    setSelectedInspection(inspection);
  
    try {
      const response = await fetch(`http://localhost:8080/api/inspection_information/${inspection.id}`);
      const data = await response.json();
      setInspectionPlans(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error('Error fetching inspection plans:', error);
    }
  };

  return (
    <PageContainer>
      <Card>
        <Heading>
          <FontAwesomeIcon icon={faCoins} className="icon-color" style={{ marginRight: '0.5em' }} />
          Valvonnan kohteet:
        </Heading>
        <List>
          {inspections.map((inspection) => (
            <InspectionItem key={inspection.id} onClick={() => handleInspectionClick(inspection)}>
              {inspection.name}
            </InspectionItem>
          ))}
        </List>
      </Card>

      
        {selectedInspection && (
          <Card>
            <Heading>Inspection Plans for {selectedInspection.name}:</Heading>
            <List>
              {inspectionPlans && inspectionPlans.length > 0 ? (
                inspectionPlans.map((plan) => (
                  <InspectionItem key={plan.id}>
                    <PlanLink to={`/tarkastukset/${plan.id}`}>
                      <FontAwesomeIcon icon={faGavel} className="icon-color" style={{ marginRight: '0.5em' }} />
                      DataContainer for {plan.subject_of_inspection}
                    </PlanLink>
                  </InspectionItem>
                ))
              ) : (
                <p>No inspection plans found.</p>
              )}
            </List>
            </Card>
        )}
      
    </PageContainer>
  );
};

export default Homepage;