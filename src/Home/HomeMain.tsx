import React, { useState, useEffect, Component, FC} from 'react';
import Tables from './Tables';
import TableSelector from './TableSelector';
import QueryGenerator from './QueryGenerator';
import UserInput from './UserInput'


function Home() {

  const [fields, setFields] = useState([
    ['Database Link']
  ]);
  const [textField, setTextField] = useState<string>('');
  const [dataSet, setDataSet] = useState<string>('');
  const [visualizerData, setVisualizerData] = useState<number[]>([0]);
  const [tableNames, setTableNames] = useState<string>(''); //this kind of syntax allows functionality of changing state all in one function
  const [queryDataSet, setQueryDataSet] = useState<string>('');
  const [queryDisplayData, setQueryDisplayData] = useState<number[]>([null, null]);

  const [queryTable, setQueryTable] = useState<string>('');
  const [queryCommand, setQueryCommand] = useState<string>('');

  function makeDBRequest(link: string) {
    fetch('/api/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ link: link })
    })
      .then(function(response) {
          if (!response.ok) {
              throw new Error("HTTP status " + response.status);
          }
          return response.json();
      })
      .then(data => {
        setTextField(link);
        setDataSet(data['tableData']);
        setQueryDataSet(data['tableData']);
        setTableNames(data['tableNames']);
      })
      .catch((err) => {
        console.log('Error:', err)//YO CT,it is because the value of the first table is 0 so when you if(!value[1]) it alwasy false
      });                       //once you change the sencond drop down to something else, it works proper
  }

  let fieldsArray = [];
  for (let i = 0; i < fields.length; i++) {
    fieldsArray.push(<UserInput fields={fields[i]} key={i} setTextField={setTextField} makeDBRequest={makeDBRequest}/>)
  }

  function changeDataRender(visualizer: boolean, value: number, value2: number) {
    //hello! this ternary is kinda confusing. its bascially saying that it if its not the visualizer table,
    // then change the other table instead, then check if they values are the same
    // if they are, then just print it once
    return visualizer === true ? setVisualizerData([value]) :
    (value !== value2) ?
    setQueryDisplayData([value, value2]) :
    setQueryDisplayData([value, null])
  }

  if (!dataSet) {
    return( //replaces "render"
      <div className="homeContainer">
        <h1>Please insert your PostgreSQL database link.</h1>
        {fieldsArray}
      </div>
    )
  } else {
    return (
      // we have two tables: one carries the visualizer state, the other is for the query state
      // if you look inside their boxes you will notice the small difference. so don't be confused by the naming :)
      <div className="homeContainer">
        <h1>Table Visualizer</h1>
        {/* {dataObjects} */}
        <TableSelector
          changeDataRender={changeDataRender}
          dataSet={dataSet}
          visualizerData={visualizerData}
          setVisualizerData={setVisualizerData}
          tableNames={tableNames}
        />
        <Tables
          changeDataRender={changeDataRender}
          dataSet={dataSet[visualizerData[0]]}
          displayData={visualizerData}
          setVisualizerData={setVisualizerData}
        />
        <h1>Join Visualizer and Query Generator</h1>
        <h3>Tables:</h3>
        <QueryGenerator
          tableNames={tableNames} //tableNames is a useState - {tableNames} will invoke the func(invokes state)
          changeDataRender={changeDataRender}
          queryDataSet={queryDataSet}
          setQueryDisplayData = {setQueryDisplayData}
          queryDisplayData={queryDisplayData}
          setQueryDataSet={setQueryDataSet}
          setQueryTable = {setQueryTable}
          setQueryCommand = {setQueryCommand}
        />
        <Tables
          changeDataRender={changeDataRender}
          dataSet={queryTable}
          displayData={queryDisplayData}
          setVisualizerData={setQueryDisplayData}
        />
        <h3>Command:</h3>
        <div className="queryCommand">{queryCommand}</div>
      </div>
    );
  }
}

export default Home
