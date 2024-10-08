import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import Task from './AddTask/Submodules/Task';
import ViewTaskUpdateMain from './ViewTaskUpdate/Submodules/ViewTaskUpdateMain';

const StyledButton = styled(Button)({
  margin: '0 0px',
  height: '2.4rem',

});

const AddTask = () => {
  const [activeButton, setActiveButton] = useState('NewTask');
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
      overflowY: "hidden",
      overflowX: "hidden",
    }}>
      <div style={{margin: "20px", display: "flex",flexDirection: "row", justifyContent:"space-evenly"}}>
      <StyledButton
        variant={activeButton === 'NewTask' ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => {setStep(1); handleButtonClick('NewTask')}}
      >
        Add New Task
      </StyledButton>
      <StyledButton
        variant={activeButton === 'TaskList' ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => {setStep(2); handleButtonClick('TaskList')}}
      >
        View Task Update
      </StyledButton>
    </div>
      {step == 1 && (<Task/>)}
      {step == 2 && (<ViewTaskUpdateMain/>)}
    </div>
  )
}

export default AddTask