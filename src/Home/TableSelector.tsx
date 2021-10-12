import React, { useEffect, useState, Component} from 'react'
// import Tables from './Tables'

const TableSelector = (props: any) => {

  const amountOfTables = []
  if (props.dataSet) {
    for (let i = 0; i < props.dataSet.length; i++) {
      let title;
      if (props.tableNames[i]) title = props.tableNames[i].toUpperCase();
      amountOfTables.push(
        <button
          className={props.displayData[0] === i ? 'active' : 'tableButtonSelectors'}
          key={i}
          onClick={() => {props.changeDataRender(i)}}
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
