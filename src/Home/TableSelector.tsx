import React, { useEffect, useState, Component} from 'react'


const TableSelector = (props: any) => {
  const { changeDataRender } = props

  const amountOfTables = []
  if (props.dataSet) {
    for (let i = 0; i < props.dataSet.length; i++) {
      let title;
      if (props.tableNames[i]) title = props.tableNames[i].toUpperCase();
      amountOfTables.push(
        <button
          className={props.visualizerData[0] === i ? 'active' : 'tableButtonSelectors'}
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
