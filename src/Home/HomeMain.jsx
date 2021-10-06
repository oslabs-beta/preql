import React, { useState, useEffect, Component } from 'react';
import InputRows from './InputRows.jsx';
// import Connect from 'Connect';

function Home() {
  const [fields, setFields] = useState([
    ['Database Link']
  ]);
  const [textField, setTextField] = useState('');
  const [dataSet, setDataSet] = useState()

  function makeDBRequest(link) {
    fetch('/api/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ link: link })
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP status " + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        //console.log(data)
        setTextField(link);
        setDataSet(data)
      })
      .catch((err) => {
        console.log('Error:', err)
      });
  }

  let fieldsArray = [];
  for (let i = 0; i < fields.length; i++) {
    fieldsArray.push(<InputRows fields={fields[i]} key={i} textField={textField} setTextField={setTextField} makeDBRequest={makeDBRequest} />)
  }

  useEffect(() => {
    console.log(textField, 'useEffect')
  });

  if (!textField) {
    return ( //replaces "render"
      <div className="homeContainer">
        <h1>"I Love Aki" - Adi</h1>
        {fieldsArray}
      </div>
    )
  } else {
    return (
      <div className="homeContainer">
        <h1>It's Working</h1>
        {textField}
      </div>
    )
  }
}

export default Home
