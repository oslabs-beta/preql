import React, { useState, useEffect, Component} from 'react';
import InputRows from './InputRows.jsx';
import Tables from './Tables.jsx'
import TableSelector from './TableSelector.jsx'
// import Connect from 'Connect';

function Home() {
  const [ fields, setFields ] = useState([
    ['Database Link']
  ]);
  const [textField, setTextField] = useState(false);
  const [dataSet, setDataSet] = useState('');
  const [displayData, setDisplayData] = useState();
  
  function makeDBRequest(link) {
    fetch('/api/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ link: link })
    })
      .then(function(response) {
          console.log(response.status); // Will show you the status
          if (!response.ok) {
              throw new Error("HTTP status " + response.status);
          }
          return response.json();
      })
      .then(data => {
        setTextField(link);
        setDataSet(data);
        setDisplayData(0);
      })
      .catch((error) => {
        console.log('Error:', error)
      });
  }

  let fieldsArray = [];
  for (let i = 0; i < fields.length; i++) {
    fieldsArray.push(<InputRows fields={fields[i]} key={i} textField={textField} setTextField={setTextField} makeDBRequest={makeDBRequest}/>)
  }

  // let dataObjects = []
  // for (let i = 0; i < dataSet.length; i++) {
  //   dataObjects.push(<Tables dataSet={dataSet} key={i}/>)
  // // }
  // useEffect(() => {
  //   console.log(textField, 'useEffect')
  // });

  if (!dataSet) {
    return( //replaces "render"
      <div className="homeContainer">
        <h1>"I Love Aki" - Adi</h1>
        {fieldsArray}
      </div>
    )
  } else {
    return(
      <div className="homeContainer">
        <h1>It's Working</h1>
        {/* {dataObjects} */}
        <TableSelector dataSet={dataSet} setDisplayData={setDisplayData}/> 
        <Tables dataSet={dataSet[displayData]}/>
      </div>
    )
  }
}

export default Home
