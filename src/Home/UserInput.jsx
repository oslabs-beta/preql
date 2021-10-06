import React, { useState, useEffect, Component } from 'react'

const UserInput = (props) => {
  return(
    <div className="UserInput">
      <label>{props.field}</label>
      <input type="text" className="URIinput" placeholder="postgres://" /><br></br>
      <button className="submitButton" onClick={() => props.makeDBRequest(document.getElementsByClassName('URIinput')[0].value)}>Submit</button>
    </div>
  )
}

export default UserInput
