import React, { useState, useEffect, Component } from 'react';
import InputRows from './InputRows.jsx'

const UserInput = (props) => {


  const fieldsArray = [];
  let keyID = 0
  props.fields.forEach((el) => {
    fieldsArray.push(<InputRows field={el} key={++keyID}/>)
  })

  return(
    <div className="UserRows">
      {fieldsArray}
    </div>
  )
}

export default UserInput
