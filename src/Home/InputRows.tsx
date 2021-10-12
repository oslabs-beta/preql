import React, { useState, useEffect, Component, FC } from 'react';
import UserInput from './UserInput'

const InputRows = (props: any) => {

  const fieldsArray: any = [];
  let keyID = 0
  props.fields.forEach((el: any) => {
    fieldsArray.push(<UserInput field={el} key={++keyID} textField={props.textField} setTextField={props.setTextField} makeDBRequest={props.makeDBRequest}/>)
  })

  return(
    <div className="InputRows">
      {fieldsArray}
    </div>
  )
}

export default InputRows
