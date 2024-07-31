import React from 'react'
import LeftSideBarMain from './Submodules/LeftSideBarMain'

const LeftSideBar = (props) => {
  return (
    <div>
      <LeftSideBarMain currentItem= {props.currentItem}/>
    </div>
  )
}

export default LeftSideBar