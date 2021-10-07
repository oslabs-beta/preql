import React, { useEffect, useState, Component} from 'react'
import Tables from './Tables.jsx'

const TableSelector = (props) => {

  const amountOfTables = []
  if (props.dataSet) {
    for (let i = 0; i < props.dataSet.length; i++) {
      amountOfTables.push(
        <button 
          className="tableButtonSelectors" 
          key={i}
          onClick={() => props.changeDataRender(i)}
        >
          Table {i + 1}
        </button>
      )
    }
  }
  useEffect(() => {
    // console.log(props.changeDataRender);
  }) 

  return (
    <div className="tablesDiv">
      {amountOfTables}
    </div>
  );
}

export default TableSelector
