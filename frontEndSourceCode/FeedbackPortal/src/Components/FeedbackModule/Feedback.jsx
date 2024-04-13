import React from 'react'
import Navbar from '../Navbar/Navbar'
import FeedbackMain from './Submodules/FeedbackMain'

const Feedback = ({visitorAndPsArray, handleDialogOpen, handleError}) => {
  return (
    <div>
      <FeedbackMain visitorAndPsArray={visitorAndPsArray} handleDialogOpen={handleDialogOpen} handleError={handleError}/>
    </div>
  )
}

export default Feedback