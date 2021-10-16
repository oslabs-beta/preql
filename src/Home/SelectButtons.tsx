import React, { useState, useEffect } from 'react'
import SelectionChoices from './SelectionChoices'

const SelectButton = (props: any) => {
  const {setGenerateSearchField, tableNames, tableTargets, tables, queryDataSet, setSearchField, searchField, setTableTargets, setTables } = props

  function searchFieldsChanger(nameOfTable: string, dataFromTable: object[], index: number) {
    const array:string[] = []
    for (const key in dataFromTable[0]) {
      const str: string = nameOfTable + '.' + key;
      array.push(str)
    }
    searchField[index] = array
    //we have to invoke set state so the whole thing re-renders and the search bar changes
    setSearchField(searchField)
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
      />
    )
  }

  return (
    <div>
      {selectors}
    </div>
  )
}


export default SelectButton
