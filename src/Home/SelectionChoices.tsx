import React, { useState, useEffect } from 'react'

const SelectionChoices = (props: any) => {
  const { tableNames, num, selectionChoicesFunction, filterSelectBarElements } = props

  const options: any = [<option key={-1}></option>]; //need to ensure input being pushed inside array will be a string
  for (let i = 0; i < tableNames.length; i++) {
    let title = tableNames[i];
    options.push(
      <option key={i} value={title}>{title}</option>
    )
  }


  return (
      <div className="tableButtons">
        <select className="tableDropdown" onChange={(ev) => {
            selectionChoicesFunction(ev, num)
            filterSelectBarElements()
          }}>
          {options}
        </select>
      </div>
  )
}

export default SelectionChoices