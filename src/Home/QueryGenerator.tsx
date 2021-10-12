import React, {useEffect, useState, Component, FC } from 'react';

function QueryGenerator(props: any) {

  const [tableTargets, setTableTargets] = useState<number[]>([0, 0])
  // interface ReactHTML {
  //   button:
  // }
  const JOIN: string[] = ['LEFT', 'RIGHT', 'INNER', 'OUTER'];
  const options: any = []; //need to ensure input being pushed inside array will be a string
  const joinOptions: any = [];
  for (let i = 0; i < JOIN.length; i++) {
    let joinType = JOIN[i];
    joinOptions.push(
      <option key={i} value={joinType}>{joinType}</option>
    )
  }

  for (let i = 0; i < props.tableNames.length; i++) {
    let title = props.tableNames[i];
    options.push(
      <option key={i} value={title}>{title}</option>
    )
  }

  return (
    <div className="queryGenerator">
      <div className="tableButtons">
        <select className="tableDropdown" onChange={(ev) => { setTableTargets([ev.target.selectedIndex, tableTargets[1]]) }}>
          {options}
        </select>
        <select className="tableDropdown" onChange={(ev) => { setTableTargets([tableTargets[0], ev.target.selectedIndex])}}>
          {options}
        </select>
      </div>
      <div className="tableButtons">
        <button className="okayButton" onClick={() => props.changeDataRender(tableTargets[0], tableTargets[1])}>ok</button>
      </div>
      <div className="tableButtons">
        <label htmlFor="">SELECT</label>
        <select className="tableDropdown"></select>
        <label htmlFor="">FROM {props.tableNames[tableTargets[0]]}</label>
      </div>
      <div className="tableButtons">
        <select className="tableDropdown">
          {joinOptions}
        </select>
        <label htmlFor="">JOIN {props.tableNames[tableTargets[1]]} ON</label>
        <select className="tableDropdown"></select>
        <label htmlFor=""> = </label>
        <select className="tableDropdown"></select>
      </div>
    </div>
  )
}


export default QueryGenerator
