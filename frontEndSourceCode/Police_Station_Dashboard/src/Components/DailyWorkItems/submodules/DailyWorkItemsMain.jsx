import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import AddNewWorkItem from './AddNewWorkItem';
import WorkList from './WorkList';

const StyledButton = styled(Button)({
  margin: '0 0px',
  height: '2.4rem',

});

const DailyWorkItemsMain = () => {
  const [activeButton, setActiveButton] = useState('WorkList');
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
      <div style={{ margin: "20px", display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
        <StyledButton
          variant={activeButton === 'WorkList' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => { setStep(1); handleButtonClick('WorkList') }}
        >
          View Work List
        </StyledButton>
        <StyledButton
          variant={activeButton === 'NewWorkItem' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => { setStep(2); handleButtonClick('NewWorkItem') }}
        >
          Add New Work Item
        </StyledButton>
      </div>
      {step == 1 && (<WorkList />)}
      {step == 2 && (<AddNewWorkItem setActiveButton={setActiveButton} setPageStep={setStep} />)}
    </div>
  )
}

export default DailyWorkItemsMain