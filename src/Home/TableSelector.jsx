import React, { useEffect, useState, Component} from 'react'
import Tables from './Tables.jsx'

const TableSelector = (props) => {

  const amountOfTables = []
  if (props.dataSet) {
    for (let i = 0; i < props.dataSet.length; i++) {
      let title;
      if (props.tableNames[i]) title = props.tableNames[i].toUpperCase();
      amountOfTables.push(
        <button
          className={props.displayData === i ? 'active' : 'tableButtonSelectors'}
          key={i}
          onClick={() => {props.changeDataRender(i)}}
          // onClick={() => {props.changeDataRender(i); changeToActive() }}
        >
          {title}
        </button>
      )
    }
  }

  // useEffect(() => {
  //   // console.log(props.changeDataRender);
  // })

  return (
    <div className="tableSelector">
      {amountOfTables}
    </div>
  );
}

export default TableSelector
