import styled from '@emotion/styled';
import { Card, Typography } from '@mui/material';

export const StyledCard = styled(Card)`
  width: 270px;
  background-color: #1976d2;
  margin: 16px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

export const CardTitle = styled(Typography)`
  font-size: 15px;
  font-weight: bold;
  color: white !important;
`;

export const DataText = styled(Typography)`
  font-size: 14px;
  color: white !important;
`;

export const IconContainer = styled.div`
  color: white;
`;