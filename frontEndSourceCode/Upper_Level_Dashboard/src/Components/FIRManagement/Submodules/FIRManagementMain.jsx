import React, { useState } from 'react'
import FIRList from './FIRList'
import Control from './Control'

const FIRManagementMain = () => {

  const [step, setStep] = useState(1)
  const [firId, setFirId] = useState(0)

  return (
    <>
      {step == 1 && (<FIRList setFIRId={setFirId} setStep={setStep}/>)}
      {step == 2 && (<Control firId={firId}/>)}
    </>
  )
}

export default FIRManagementMain