import React, { useState } from 'react'
import FIRDetails from './FIRDetails'
import FIRUpdate from './FIRUpdate'
import NewUpdate from './NewUpdate'
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
  margin: '0 0px',
  height: '2.4rem',

});

const FIRManagementMain = () => {
  const [activeButton, setActiveButton] = useState('FIR');
  const [step, setStep] = useState(1);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  return (
    <div style={{
      height: "calc(100vh - 4.3rem)",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflowY: "scroll",
      overflowX: "hidden",
    }}>
      <div style={{margin: "50px", display: "flex",flexDirection: "row", justifyContent:"space-evenly"}}>
      <StyledButton
        variant={activeButton === 'FIR' ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => {setStep(1); handleButtonClick('FIR')}}
      >
        FIR Details
      </StyledButton>
      <StyledButton
        variant={activeButton === 'Updates' ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => {setStep(2); handleButtonClick('Updates')}}
      >
        Updates
      </StyledButton>
      <StyledButton
        variant={activeButton === 'NewUpdate' ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => {setStep(3); handleButtonClick('NewUpdate')}}
      >
        New Update
      </StyledButton>
      <StyledButton
        variant={activeButton === 'FileChargesheet' ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => handleButtonClick('FileChargesheet')}
      >
        File Chargesheet
      </StyledButton>
    </div>
      {step == 1 && (<FIRDetails/>)}
      {step == 2 && (<FIRUpdate/>)}
      {step == 3 && (<NewUpdate/>)}  
    </div>
  )
}

export default FIRManagementMain