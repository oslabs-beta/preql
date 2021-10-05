import React, { useState, useEffect, Component } from 'react'

const InputRows = (props) => {
  return(
    <div className="UserInput">
      {props.field}
      <input></input>
    </div>
  )
}

export default InputRows
