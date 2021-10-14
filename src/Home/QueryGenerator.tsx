import React, {useEffect, useState, Component, FC } from 'react';
import Select from 'react-select';

function QueryGenerator(props: any) {
  const { queryDataSet, tableNames, changeDataRender } = props;

  const [tableTargets, setTableTargets] = useState<number[]>([0, 0])
  const [tables, setTables] = useState<string[]>(['', ''])
  const [searchField, setSearchField] = useState<any[]>([{}, {}])

  const [listOfOptions, setListOfOptions] = useState<any>([]);

  const JOIN: string[] = ['OUTER', 'LEFT', 'RIGHT', 'INNER'];
  const options: any = []; //need to ensure input being pushed inside array will be a string
  const joinOptions: any = [];
  for (let i = 0; i < JOIN.length; i++) {
    let joinType = JOIN[i];
    joinOptions.push(
      <option key={i} value={joinType}>{joinType}</option>
    )
  }

  for (let i = 0; i < props.tableNames.length; i++) {
    let title = props.tableNames[i];
    options.push(
      <option key={i} value={title}>{title}</option>
    )
  }


  function autoCompleteBox() {
    console.log(searchField)
    let tempListofOptions = [];
    for (let i = 0; i < searchField.length; i++) {
      if (tableTargets[0] === tableTargets[1]) i = i + 1
      for (const key in searchField[i]) {
        let temp: any = {};
        temp['value'] = `${key}` // {}
        temp['label'] = `${key}`
        tempListofOptions.push(temp)
      }
    }
    setListOfOptions(tempListofOptions);
  }


  function searchFieldsChanger(nameOfTable: string, dataFromTable: object[] , index: number) {
    const currObj:{[key: string]: string} = {};
    for (let i = 0; i < dataFromTable.length; i++) {
       for(const key in dataFromTable[i]){
         const str:string = nameOfTable + '.' + key;
         currObj[str] = key;
       }
    }
    if (index === 0) {
      setSearchField([currObj, searchField[1]])
    } else {
      setSearchField([searchField[0], currObj])
    }
  }

  useEffect(() => {
    // console.log(searchField)
  })

  // const customStyle = {
  //   control: styles => ({ ...styles, backgroundColor: 'white' }),
  //   option: (styles, { data, isDisabled, isFocused, isSelected }) => {
  //     const color = chroma(data.color);
  //     return {
  //       ...styles,
  //       backgroundColor: isDisabled ? 'red' : blue,
  //       color: '#FFF',
  //       cursor: isDisabled ? 'not-allowed' : 'default',
  //       ...
  //     };
  //   },
  //   ...
  // };



  return (
    <div className="queryGenerator">
      <div className="tableButtons">
        <select className="tableDropdown" onChange={(ev) => { /*invoke searchFieldsChanger here  */
          const nameOfTable = ev.target.value;
          const index = ev.target.selectedIndex;
          setTableTargets([index, tableTargets[1]]);
          setTables([nameOfTable, tables[1]]);

          const dataFromTable = queryDataSet[index];
          searchFieldsChanger(nameOfTable, dataFromTable, 0);
        }}>
          {options}
        </select>
        <select className="tableDropdown" onChange={(ev) => {
          const nameOfTable = ev.target.value
          const index = ev.target.selectedIndex
          setTableTargets([tableTargets[0], index])
          setTables([tables[0], nameOfTable])

          const dataFromTable = queryDataSet[index];
          searchFieldsChanger(nameOfTable, dataFromTable, 1);

        }}>
          {options}
        </select>
      </div>
      <div className="tableButtons">
        {/* changes our state to the two table names for our state :) */}
        <button className="okayButton" onClick={() => {
            changeDataRender(false, tableTargets[0], tableTargets[1]);
            autoCompleteBox();
          }
        }>ok</button>
      </div>
      <div className="tableButtons">
        <label htmlFor="">SELECT</label>
        <Select options={listOfOptions} />
        {/* <Select style={customStyle} options={listOfOptions} /> */}
        <label htmlFor="">FROM {tableNames[tableTargets[0]]}</label>
      </div>
      <div className="tableButtons">
        <select className="tableDropdown">
          {joinOptions}
        </select>
        <label htmlFor="">JOIN {tableNames[tableTargets[1]]} ON</label>
        <select className="tableDropdown"></select>
        <label htmlFor=""> = </label>
        <select className="tableDropdown"></select>
      </div>
      <div>
        <button className="generateButton" onClick={() => console.log(props)}>Generate</button>
        {/* .queryDataSet */}
      </div>
    </div>
  )
}


export default QueryGenerator
