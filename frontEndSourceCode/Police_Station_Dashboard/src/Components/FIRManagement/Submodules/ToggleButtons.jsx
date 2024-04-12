import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
  margin: '0 0px',
  height: '2.4rem'
});

const ToggleButtons = () => {
  const [activeButton, setActiveButton] = useState('FIR');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div>
      <StyledButton
        variant={activeButton === 'FIR' ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => handleButtonClick('FIR')}
      >
        FIR Details
      </StyledButton>
      <StyledButton
        variant={activeButton === 'Updates' ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => handleButtonClick('Updates')}
      >
        Updates
      </StyledButton>
      <StyledButton
        variant={activeButton === 'NewUpdate' ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => handleButtonClick('NewUpdate')}
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
  );
};

export default ToggleButtons;
