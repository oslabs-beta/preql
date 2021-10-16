import React, {useLayoutEffect, useState, FC } from 'react';
import ReactDOM from'react-dom'
import Select from 'react-select';
import SelectButton from './SelectButtons';

function QueryGenerator(props: any) {
  const { queryDataSet, tableNames, changeDataRender} = props;

  const [tableTargets, setTableTargets] = useState<number[]>([null, null])
  const [tables, setTables] = useState<string[]>(['', ''])
  const [searchField, setSearchField] = useState<any[]>([[], []])

  let [generateSearchField, setGenerateSearchField] = useState<boolean>(false)

  const JOIN: string[] = ['OUTER', 'LEFT', 'RIGHT', 'INNER'];
  const joinOptions: any = [];
  for (let i = 0; i < JOIN.length; i++) {
    let joinType = JOIN[i];
    joinOptions.push(
      <option key={i} value={joinType}>{joinType}</option>
    )
  }

  // function autoCompleteBox() {

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
        />
      <div className="tableButtons">
        <button className="okayButton" onClick={() => {
          console.log(tableTargets)
          if (tableTargets[0] !== null && tableTargets[1] !== null && tableTargets[0] !== tableTargets[1])setGenerateSearchField(true)
          else setGenerateSearchField(false)
        }}>ok</button>
      </div>
      { generateSearchField ?
      <div className="queryGenerator">
        <div className="tableButtons">
          <label htmlFor="">SELECT</label>
          <Select isMulti options={listOfOptions} placeholder="Leave empty for select ALL (*)"/>
          <label htmlFor="">FROM {tableNames[tableTargets[0]]}</label>
        </div>
        <div className="tableButtons">
          <select className="tableDropdown">
            {joinOptions}
          </select>
          <label htmlFor="">JOIN {tableNames[tableTargets[1]]} ON</label>
          <select className="tableDropdown">
            {onOptions[0]}
          </select>
          <label htmlFor=""> = </label>
          <select className="tableDropdown">
            {onOptions[1]}
          </select>
        </div>
        <div>
          <button className="generateButton" onClick={() => changeDataRender(false, tableTargets[0], tableTargets[1])
          }>Generate</button>
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
