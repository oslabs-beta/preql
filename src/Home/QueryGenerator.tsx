import React, {useLayoutEffect, useState, FC } from 'react';
import ReactDOM from'react-dom'
import Select from 'react-select';
import SelectButton from './SelectButtons';

function QueryGenerator(props: any) {
  const { queryDataSet, tableNames, changeDataRender} = props;

  const [tableTargets, setTableTargets] = useState<number[]>([null, null])
  const [tables, setTables] = useState<string[]>(['', ''])
  const [searchField, setSearchField] = useState<any[]>([[], []])

  const [onCondition, setOnCondition] = useState<string[]>(['',''])
  const [joinCondition, setJoinCondition] = useState<string>('') //default will always be inner
  const [selectCondition, setSelectCondition] = useState<string[]>([])

  const [generateSearchField, setGenerateSearchField] = useState<boolean>(false)

  type arrayOfArrays = [string[], string[]] // will have strings within those arrays
  type stringArray = [string?, string?]

  interface databaseConnection {
    tables: arrayOfArrays;
    on: string[];
    how: string;
    columns?: string[]
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

  return (
    <div className="queryGenerator">
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
        setOnCondition={setOnCondition}
        setJoinCondition={setJoinCondition}
        setSelectCondition={setSelectCondition}
        />
      <div className="tableButtons">
        <button className="okayButton" onClick={() => {
          console.log(tableTargets)
          if (tableTargets[0] !== null && tableTargets[1] !== null && tableTargets[0] !== tableTargets[1]) setGenerateSearchField(true);
          // else setGenerateSearchField(false)
        }}>ok</button>
      </div>
      { generateSearchField ?
      <div className="queryGenerator">
        <div className="tableButtons">
          <label htmlFor="">SELECT</label>
          <div className="multiSelect">
            <Select isMulti options={listOfOptions} placeholder="Leave empty for select ALL (*)" onChange={(ev) => {
              const array = []
              for (let i = 0; i < ev.length; i++) array.push(ev[i]['value']);
              setSelectCondition(array);
          }}/>
          </div>
          <label htmlFor="">FROM {tableNames[tableTargets[0]]}</label>
        </div>
        <div className="tableButtons">
          <select className="tableDropdown" onChange={(ev) => {
            setJoinCondition(ev.target.value)
          }}>
            {joinOptions}
          </select>
          <label htmlFor="">JOIN {tableNames[tableTargets[1]]} ON</label>
          <select className="tableDropdown" onChange={(ev) => {
            setOnCondition([ev.target.value, onCondition[1]])
          }}>
            {onOptions[0]}
          </select>
          <label htmlFor=""> = </label>
          <select className="tableDropdown" onChange={(ev) => {
            setOnCondition([onCondition[0], ev.target.value])
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
          }}>Generate</button>
        </div>
      </div>
        : null
      }
    </div>
  )
}


export default QueryGenerator


/* // <div>
    //   <div className="tableButtons">
    //     <select className="tableDropdown" onChange={(ev) => { /*invoke searchFieldsChanger here  */
    //       const nameOfTable = ev.target.value;
    //       const index = ev.target.selectedIndex;
    //       setTableTargets([index, tableTargets[1]]);
    //       setTables([nameOfTable, tables[1]]);

    //       const dataFromTable = queryDataSet[index];
    //       searchFieldsChanger(nameOfTable, dataFromTable, 0);
    //     }}>
    //       {options}
    //     </select>
    //   </div>
    //   <div className="tableButtons">
    //     <select className="tableDropdown" onChange={(ev) => { /*invoke searchFieldsChanger here  */
    //       const nameOfTable = ev.target.value;
    //       const index = ev.target.selectedIndex;
    //       setTableTargets([index, tableTargets[1]]);
    //       setTables([nameOfTable, tables[1]]);

    //       const dataFromTable = queryDataSet[index];
    //       searchFieldsChanger(nameOfTable, dataFromTable, 0);
    //     }}>
    //       {options}
    //     </select>
    //   </div>
    // </div> */}
