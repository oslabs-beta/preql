import React, { useState, useEffect, Component } from 'react';

const UserInput = (props: any) => {
  const [URIinput, setURIinput] = useState<string>('');
  return(
    <div className="UserInput">
      <label>{props.field}</label>
      <input type="text" className="URIinput" value={URIinput} onChange={(event) => setURIinput(event.target.value)} placeholder="postgres://" /><br></br>
      <button className="submitButton" onClick={() => props.makeDBRequest(URIinput)}>Submit</button>
    </div>
  )
}

export default UserInput
