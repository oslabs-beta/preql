import React, { useState, useEffect, Component } from 'react'

const UserInput = (props) => {
  return(
    <div className="UserInput">
      {props.field}
      <input></input>
    </div>
  )
}

export default UserInput
