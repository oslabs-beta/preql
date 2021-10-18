import { join } from 'path/posix';
import React, {useLayoutEffect, useState, FC, useRef, useEffect } from 'react';
import ReactDOM from'react-dom'
import Select from 'react-select';
import SelectButton from './SelectButtons';
import Warning from './Warning';

function QueryGenerator(props: any) {
  const { queryDataSet, tableNames, changeDataRender, setQueryDataSet } = props;

  const [tableTargets, setTableTargets] = useState<number[]>([-1, -1])
  const [tables, setTables] = useState<string[]>(['', ''])
  const [searchField, setSearchField] = useState<any[]>([[''], ['']])

  const [warning, setWarning] = useState<boolean>(false)

  const [generateSearchField, setGenerateSearchField] = useState<boolean>(false)

  // do we need to move this fetch request to another component?
  function queryDFRequest(query: databaseConnection) {
    fetch('/api/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query })
    })
      .then(function(response) {
        if (!response.ok) {
          throw new Error("HTTP status " + response.status);
        }
        return response.json();
      })
      .then(data => {
        // set state for the table below the query generator
      })
      .catch((err) => {
        console.log('Error:', err)
      })
  };

  type arrayOfArrays = [string[], string[]] // will have strings within those arrays
  type stringArray = [string, string]
  type optionalStrings = [string?, string?]

  interface databaseConnection {
    tables: arrayOfArrays;
    on: string[];
    how: string;
    columns: optionalStrings;
    tableNames: stringArray;
  }

  const JOIN: string[] = ['INNER', 'LEFT', 'RIGHT', 'OUTER'];
  const joinOptions: any = [];

  for (let i = 0; i < JOIN.length; i++) {
    let joinType = JOIN[i];
    joinOptions.push(
      <option key={i} value={joinType}>{joinType}</option>
    )
  }


  let listOfOptions = [];
  let onOptions=[];
  for (let i = 0; i < searchField.length; i++) {
    onOptions.push([]);
    if (tableTargets[0] === tableTargets[1]) break;
    for (let j = 0; j < searchField[i].length; j++) {
      let temp: any = {};
      temp['value'] = `${searchField[i][j]}` // {}
      temp['label'] = `${searchField[i][j]}`
      listOfOptions.push(temp)
      onOptions[i].push(<option key={i+j} value={searchField[i][j]}>{searchField[i][j]}</option>)
    }
  }

  useEffect(()=>{
    setGenerateSearchField(true);
  }, [generateSearchField])

  let onCondition = [searchField[0][0], searchField[1][0]]
  let joinCondition:string = JOIN[0];
  let selectCondition:any = [];

  return (
    <div className="queryContainer">
        <SelectButton
        tableNames={tableNames}
        tables={tables}
        tableTargets={tableTargets}
        setTables={setTables}
        setTableTargets={setTableTargets}
        queryDataSet={queryDataSet}
        setSearchField={setSearchField}
        searchField={searchField}
        setGenerateSearchField={setGenerateSearchField}
        setWarning={setWarning}
        />
      <Warning warning={warning} className="warning" />
      <div className="queryGenerator">
        <div className="tableButtons">
          <label htmlFor="">SELECT</label>
          <div className="multiSelect">
            <Select isMulti options={listOfOptions} placeholder="Leave empty for select ALL (*)" onChange={(ev) => {
              selectCondition = [];
              for (let i = 0; i < ev.length; i++) selectCondition.push(ev[i]['value']);
          }}/>
          </div>
          <label htmlFor="">FROM {tableNames[tableTargets[0]]}</label>
        </div>
        <div className="tableButtons">
          <select className="tableDropdown" onChange={(ev) => {
            joinCondition = JOIN[ev.target.selectedIndex];
          }}>
            {joinOptions}
          </select>
          <label htmlFor="">JOIN {tableNames[tableTargets[1]]} ON</label>
          <select className="tableDropdown" onChange={(ev) => {
            onCondition = [ev.target.value, onCondition[1]];
          }}>
            {onOptions[0]}
          </select>
          <label htmlFor=""> = </label>
          <select className="tableDropdown" onChange={(ev) => {
            onCondition = [onCondition[0], ev.target.value]
          }}>
            {onOptions[1]}
          </select>
        </div>
        <div>
          <button className="generateButton" onClick={() => {
            // changeDataRender(false, tableTargets[0], tableTargets[1])
            const reqBody:databaseConnection = {
              //array or arrays
              tables: [queryDataSet[tableTargets[0]], queryDataSet[tableTargets[1]]],
              //array of strings of length 2
              on: onCondition,
              //string not empty and 'INNER', 'LEFT', 'RIGHT', 'OUTER'
              how: joinCondition,
              //array of strings or empty array
              columns: selectCondition,
              //array of strings of length 2
              tableNames: [tableNames[tableTargets[0]], tableNames[tableTargets[1]]]
            }
            queryDFRequest(reqBody)
          }}>Generate</button>
        </div>
      </div>
        {/* : null
      } */}
    </div>
  )
}

export default QueryGenerator
