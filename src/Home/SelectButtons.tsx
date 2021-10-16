import React, { useState, useEffect } from 'react'
import SelectionChoices from './SelectionChoices'

const SelectButton = (props: any) => {
  const {setSelectCondition, setJoinCondition, setOnCondition, setGenerateSearchField, tableNames, tableTargets, tables, queryDataSet, setSearchField, searchField, setTableTargets, setTables } = props

  function searchFieldsChanger(nameOfTable: string, dataFromTable: object[], index: number) {
    const array:string[] = []
    for (const key in dataFromTable[0]) {
      const str: string = nameOfTable + '.' + key;
      array.push(str)
    }
    searchField[index] = array
    //we have to invoke set state so the whole thing re-renders and the search bar changes
    setSearchField(searchField)
    //so that the reqBody gets the default initial selections as on condotions
    setOnCondition([searchField[0][0], searchField[1][0]]);
  }

  const selectors: any = []
  for (let i = 0; i < tables.length; i++) {
    selectors.push(
      <SelectionChoices
        setSelectCondition={setSelectCondition}
        setJoinCondition={setJoinCondition}
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
