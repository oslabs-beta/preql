import React, { useState, useEffect } from 'react'

const SelectionChoices = (props: any) => {
  const { setWarning, setGenerateSearchField, tableNames, tableTargets, tables, queryDataSet, searchFieldsChanger, num, setTableTargets, setTables } = props

  const options: any = [<option key={-1}></option>]; //need to ensure input being pushed inside array will be a string
  for (let i = 0; i < tableNames.length; i++) {
    let title = props.tableNames[i];
    options.push(
      <option key={i} value={title}>{title}</option>
    )
  }


  return (
      <div className="tableButtons">
        <select className="tableDropdown" onChange={(ev) => {
            const nameOfTable = ev.target.value;
            const index = ev.target.selectedIndex;
            //the table we create is always one length longer than the one we are comparing too
            // so we minus one on lines 22 and 24
            tableTargets[num] = index - 1
            setTableTargets(tableTargets)
            tables[num] = nameOfTable
            setTables(tables)
            console.log(tables)

            if (tableTargets[0] !== null && tableTargets[1] !== null && tableTargets[0] !== tableTargets[1]) {
              setWarning(false)
            }
            else setWarning(true)
            
            const dataFromTable = queryDataSet[index - 1];
            searchFieldsChanger(nameOfTable, dataFromTable, num);
            setGenerateSearchField(false);
            }
          }>
          {options}
        </select>
      </div>
  )
}

export default SelectionChoices
