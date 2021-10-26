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