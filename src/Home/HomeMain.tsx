import React, { useState, useEffect, Component, FC} from 'react';
import InputRows from './InputRows';
import Tables from './Tables'
import TableSelector from './TableSelector'
import QueryGenerator from './QueryGenerator'
import Warning from './Warning'


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

  const [warning, setWarning] = useState<string>('')

  function makeDBRequest(link: string) {
    fetch('/api/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ link: link })
    })
      .then(function(response) {
          // console.log(response.status); // Will show you the status
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
        console.log('Error:', err)//YO CT,it is because the value of the first table is 0 so when you if(!value[1]) it alwasy false
      });                       //once you change the sencond drop down to something else, it works proper
  }

  let fieldsArray = [];
  for (let i = 0; i < fields.length; i++) {
    fieldsArray.push(<InputRows fields={fields[i]} key={i} textField={textField} setTextField={setTextField} makeDBRequest={makeDBRequest}/>)
  }

  function changeDataRender(visualizer: boolean, value: number, value2: number) {
    console.log(queryDisplayData)
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
        <h1>"We love merge conflicts" - The clinically insane</h1>
        {fieldsArray}
      </div>
    )
  } else {
    return (
      // we have two tables: one carries the visualizer state, the other is for the query state
      // if you look inside their boxes you will notice the small difference. so don't be confused by the naming :)
      <div className="homeContainer">
        <h1>"If the solution has to be N^2, do it in style" - CT</h1>
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
          dataSet={dataSet}
          displayData={visualizerData}
          setVisualizerData={setVisualizerData}
        />
        <Warning
          warning={warning}
          setWarning={setWarning}
        />
        <QueryGenerator
          tableNames={tableNames} //tableNames is a useState - {tableNames} will invoke the func(invokes state)
          changeDataRender={changeDataRender}
          queryDataSet={queryDataSet}
          queryDisplayData={queryDisplayData}
        />
        <Tables
          changeDataRender={changeDataRender}
          dataSet={queryDataSet}
          displayData={queryDisplayData}
          setVisualizerData={setQueryDisplayData}
        />
      </div>
    );
  }
}

export default Home
