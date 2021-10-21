import { join } from 'path/posix';
import React, {useLayoutEffect, useState, FC, useRef, useEffect } from 'react';
import ReactDOM from'react-dom'
import Select from 'react-select';
import SelectButtons from './SelectButtons';
import Warning from './Warning';

function QueryGenerator(props: any) {

  const { setQueryTable, queryDataSet, tableNames, changeDataRender, setQueryDataSet } = props;


  const [tableTargets, setTableTargets] = useState<number[]>([-1, -1]);
  const [tables, setTables] = useState<string[]>(['', ''])
  const [searchField, setSearchField] = useState<any[]>([[''], ['']]);
  const [listIndex, setListIndex] = useState<number[]>([0, 0]);

  const [warning, setWarning] = useState<boolean>(false);
  const [selectionField, setSelectionField] = useState<string[]>([])

  const [generateSearchField, setGenerateSearchField] = useState<boolean>(false);

  const [joinCondition, setJoinCondition] = useState<string>('INNER');
  let onCondition = [searchField[0][listIndex[0]], searchField[1][listIndex[1]]]

  const selectBarElements = useRef(null);

  interface selectionType {
    value: string,
    label: string
  }

  function filterSelectBarElements () {
    let { value } = selectBarElements.current.props
    const { setValue } = selectBarElements.current

    function helper(string: string) {
      const tableOneRegex = (tables[0] !== '') ? new RegExp(`^${tables[0]}[\.]`) : new RegExp(/^(?![\s\S])/g)
      const tableTwoRegex = (tables[1] !== '') ? new RegExp(`^${tables[1]}[\.]`) : new RegExp(/^(?![\s\S])/g)

      if (tableOneRegex && (tableOneRegex.test(string))) return true
      else if (tableTwoRegex && (tableTwoRegex.test(string))) return true
      else return false
    }

    if (value) {
      const result = value.filter((obj: selectionType) =>
        helper(obj.value)
      )
      setValue(result)
      setSelectionField(result)
      return value
    }
  }

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
        //this is where Adi and I need to communicate how the information is
        //given back so we can display it in a graph
        // set state for the table below the query generator
        setQueryTable(data);
      })
      .catch((err) => {
        console.log('Error:', err);

      })
  };

  function selectionChoicesFunction(ev: any, num: number){
    const nameOfTable = ev.target.value;
    const index = ev.target.selectedIndex;
    //the table we create is always one length longer than the one we are comparing too
    // so we minus one on lines 22 and 24
    tableTargets[num] = index - 1;
    setTableTargets(tableTargets);
    tables[num] = nameOfTable
    setTables(tables)

    if (tableTargets[0] !== null && tableTargets[1] !== null && tableTargets[0] !== tableTargets[1]) {
      setWarning(false)
    }
    else setWarning(true)

    const dataFromTable = queryDataSet[index - 1];
    searchFieldsChanger(nameOfTable, dataFromTable, num);
    setGenerateSearchField(false);
  }

  function searchFieldsChanger(nameOfTable: string, dataFromTable: object[], index: number) {
    const array: string[] = []
    if (dataFromTable !== undefined) {
      for (const key in dataFromTable[0]) {
        const str: string = nameOfTable + '.' + key;
        array.push(str)
      }
    }
    searchField[index] = array;
    setSearchField(searchField);
  }


  type arrayOfArrays = [string[], string[]] // will have strings within those arrays
  type stringArray = [string, string]
  type optionalStrings = [string?, string?]

  interface databaseConnection {
    tables: arrayOfArrays;
    on: string[];
    how: string;
    columns: string[];
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

  return (
    <div className="queryContainer">
        <SelectButtons
        tableNames={tableNames}
        tables={tables}
        selectionChoicesFunction={selectionChoicesFunction}
        filterSelectBarElements={filterSelectBarElements}
        />
      <Warning warning={warning} className="warning" />
      <div className="queryGenerator">
        <div className="tableButtons">
          <label htmlFor="">SELECT</label>
          <div className="multiSelect">
            <Select isMulti options={listOfOptions} ref={selectBarElements} placeholder="Leave empty for select ALL (*)" onChange={(ev) => {
              const selectConditions = [];
              for (let i = 0; i < ev.length; i++) {
                selectConditions.push(ev[i]['value']);
              }
              setSelectionField(selectConditions)
          }}/>
          </div>
          <label htmlFor="">FROM {tableNames[tableTargets[0]]}</label>
        </div>
        <div className="tableButtons">
          <select className="tableDropdown" onChange={(ev) => {
            setJoinCondition(JOIN[ev.target.selectedIndex]);
          }}>
            {joinOptions}
          </select>
          <label htmlFor="">JOIN {tableNames[tableTargets[1]]} ON</label>
          <select className="tableDropdown" onChange={(ev) => {
            if (!warning) setListIndex([ev.target.selectedIndex, listIndex[1]]);
          }}>
            {onOptions[0]}
          </select>
          <label htmlFor=""> = </label>
          <select className="tableDropdown" onChange={(ev) => {
            if (!warning) setListIndex([listIndex[0], ev.target.selectedIndex]);
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
              columns: selectionField,
              //array of strings of length 2
              tableNames: [tableNames[tableTargets[0]], tableNames[tableTargets[1]]]
            }
            console.log(reqBody)
            queryDFRequest(reqBody)
          }}>Generate</button>
        </div>
      </div>
    </div>
  )
}

export default QueryGenerator
