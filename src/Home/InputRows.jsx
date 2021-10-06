import React, { useState, useEffect, Component } from 'react';
import UserInput from './UserInput.jsx'

const InputRows = (props) => {
  const [textField, setTextField] = useState()

  // useEffect(() => {

  // }, [])

  const fieldsArray = [];
  let keyID = 0
  props.fields.forEach((el) => {
    fieldsArray.push(<UserInput field={el} key={++keyID} textField={props.textField} setTextField={props.setTextField} makeDBRequest={props.makeDBRequest}/>)
  })

  return(
    <div className="InputRows">
      {fieldsArray}
    </div>
  )
}

export default InputRows
