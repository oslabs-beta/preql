import React, { useEffect, useState, Component} from 'react'


const TableSelector = (props: any) => {
  const { changeDataRender, dataSet, tableNames, visualizerData } = props

  const amountOfTables = []
  if (dataSet) {
    for (let i = 0; i < dataSet.length; i++) {
      let title;
      if (tableNames[i]) title = tableNames[i].toUpperCase();
      amountOfTables.push(
        <button
          style={{fontFamily: "monospace"}}
          className={visualizerData[0] === i ? 'active' : 'tableButtonSelectors'}
          key={i}
          onClick={() => {changeDataRender(true, i)}}
        >
          {title}
        </button>
      )
    }
  }

  return (
    <div className="tableSelector">
      {amountOfTables}
    </div>
  );
}

export default TableSelector
