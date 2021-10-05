import React, { useState, useEffect, Component} from 'react';
import UserInput from './UserInput.jsx';
// import Connect from 'Connect';

function Home() {
  const [ fields, setFields ] = useState([
    ['Host', 'Database'],
    ['Username', 'Password'],
    ['Connor', 'Mike'],
    ['Adi', 'Kyle']
  ]);

  let fieldsArray = [];
  for (let i = 0; i < fields.length; i++) {
    fieldsArray.push(<UserInput fields={fields[i]} key={i}/>)
  }

  return(
    <div className="homeContainer">
      <h1>"I Love Aki" - Adi</h1>
      {fieldsArray}
      {/* <Connect /> */}
    </div>
  )
}

export default Home
