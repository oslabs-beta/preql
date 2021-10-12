import React, { useState, useEffect, Component, FC} from 'react';
import InputRows from './InputRows';
import Tables from './Tables'
import TableSelector from './TableSelector'
import QueryGenerator from './QueryGenerator'
// import Connect from 'Connect';

// interface states {
//   fields: [string];
// }
// function Home(config: states): { fields: ['Database Link'] } {

function Home() {

  const [fields, setFields] = useState([
    ['Database Link']
  ]);
  const [textField, setTextField] = useState<string>('');
  const [dataSet, setDataSet] = useState<string>('');
  const [displayData, setDisplayData] = useState<number[]>([0]);
  const [tableNames, setTableNames] = useState<string>('');
  const [queryDataSet, setQueryDataSet] = useState<string>('');
  const [queryDisplayData, setQueryDisplayData] = useState<number[]>([]);

  function makeDBRequest(link: string) {
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
        setDataSet(data['tableData']);
        setQueryDataSet(data['tableData'])
        setTableNames(data['tableNames'])
      })
      .catch((err) => {
        console.log('Error:', err)
      });
  }

  let fieldsArray = [];
  for (let i = 0; i < fields.length; i++) {
    fieldsArray.push(<InputRows fields={fields[i]} key={i} textField={textField} setTextField={setTextField} makeDBRequest={makeDBRequest}/>)
  }

  function changeDataRender(value: number, value2: number) {
    console.log(value, value2)
    if (!value2) setDisplayData([value]);
    else if (value !== value2) setQueryDisplayData([value, value2]);
  }

  if (!dataSet) {
    return( //replaces "render"
      <div className="homeContainer">
        <h1>"These CodeSmith girls are downbad" - The boys at MACK.js</h1>
        {fieldsArray}
      </div>
    )
  } else {
    return (
      <div className="homeContainer">
        <h1>"I miss Joel" - Connor </h1>
        {/* {dataObjects} */}
        <TableSelector
          changeDataRender={changeDataRender}
          dataSet={dataSet}
          displayData={displayData}
          setDisplayData={setDisplayData}
          tableNames={tableNames}
        />
        <Tables
          // dataSet={dataSet[displayData[0]]}
          changeDataRender={changeDataRender}
          dataSet={dataSet}
          displayData={displayData}
          setDisplayData={setDisplayData}
        />
        <QueryGenerator
          tableNames={tableNames}
          changeDataRender={changeDataRender}
        />
        <Tables
          changeDataRender={changeDataRender}
          dataSet={queryDataSet}
          displayData={queryDisplayData}
          setDisplayData={setQueryDisplayData}
        />
      </div>
    );
  }
}

export default Home
