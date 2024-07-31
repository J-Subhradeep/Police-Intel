import React, { useState } from 'react'
import FIRList from './FIRList'
import Control from './Control'

const FIRManagementMain = () => {

  const [step, setStep] = useState(1)
  const [firDetails, setFirDetails] = useState({})

  console.log(firDetails)

  return (
    <>
      {step == 1 && (<FIRList setFirDetails={setFirDetails} setStep={setStep}/>)}
      {step == 2 && (<Control firDetails={firDetails}/>)}
    </>
  )
}

export default FIRManagementMain