import React, { useState, useEffect, Component } from 'react';
import UserInput from './UserInput.jsx'

const InputRows = (props) => {

  //['Host', 'Database'],
  const fieldsArray = [];
  let keyID = 0
  props.fields.forEach((el) => {
    fieldsArray.push(<UserInput field={el} key={++keyID}/>)
  })

  return(
    <div className="InputRows">
      {fieldsArray}
    </div>
  )
}

export default InputRows
