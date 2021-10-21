import React, { useState, useEffect } from 'react'
import SelectionChoices from './SelectionChoices'

const SelectButton = (props: any) => {
  const { tableNames, tables, selectionChoicesFunction, filterSelectBarElements } = props;

  const selectors: any = []
  for (let i = 0; i < tables.length; i++) {
    selectors.push(
      <SelectionChoices
        tableNames={tableNames}
        num={i}
        key={i}
        selectionChoicesFunction={selectionChoicesFunction}
        filterSelectBarElements={filterSelectBarElements}
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

 // function searchFieldsChanger(nameOfTable: string, dataFromTable: object[], index: number) {
  //   const array:string[] = []
  //   if (dataFromTable !== undefined) {
  //     for (const key in dataFromTable[0]) {
  //       const str: string = nameOfTable + '.' + key;
  //       array.push(str)
  //     }
  //   }
  //   searchField[index] = array;
  //   setSearchField(searchField);
  // }
