import React, { useState, useEffect } from 'react'
import SelectionChoices from './SelectionChoices'

const SelectButton = (props: any) => {
  const {setGenerateSearchField, tableNames, tableTargets, tables, queryDataSet, setSearchField, searchField, setTableTargets, setTables, setWarning } = props

  function searchFieldsChanger(nameOfTable: string, dataFromTable: object[], index: number) {
    const array:string[] = []
    for (const key in dataFromTable[0]) {
      const str: string = nameOfTable + '.' + key;
      array.push(str)
    }
    searchField[index] = array;
    console.log(searchField)
    setSearchField(searchField);
  }

  const selectors: any = []
  for (let i = 0; i < tables.length; i++) {
    selectors.push(
      <SelectionChoices
        tableNames={tableNames}
        tables={tables}
        tableTargets={tableTargets}
        queryDataSet={queryDataSet}
        searchFieldsChanger={searchFieldsChanger}
        setTableTargets={setTableTargets}
        setTables={setTables}
        num={i}
        key={i}
        setGenerateSearchField={setGenerateSearchField}
        setWarning={setWarning}
      />
    )
  }

  return (
    <div className='selectButtons'>
      {selectors}
    </div>
  )
}


export default SelectButton
