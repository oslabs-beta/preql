import React, { useState, useEffect, Component, FC } from 'react';
// import ReactCSSTransitionGroup from 'react-transition-group';


const Tables = (props: any) => {
  const headers = [];
  const dataObj = [];
  const rowDataObj = [];
  const table = props.dataSet;

  if (table) {
    if (table.length != 0) {
      const columns = Object.keys(table[0]);
      for (let i = 0; i < columns.length; i++) {
        headers.push(<th key={i}>{columns[i]}</th>)
      };

      for (let i = 0; i < table.length; i++) {
        dataObj.push([])
        for (let key in table[i]) {
          dataObj[i].push(<td key={`${key}${i}`}>{table[i][key]}</td>)
        }
      };
      for (let i = 0; i < dataObj.length; i++) {
        rowDataObj.push(
          <tr key={`rowdata${i}`}>
            {dataObj[i]}
          </tr>
        )
      };
    }
    else {
      rowDataObj.push(
        <tr key={`rowdata`}>

        </tr>
      )
    };

  }

  if (table) {
    return (
      <div className="container" >
        <table >
          <thead>
            <tr>
              {headers}
            </tr>
          </thead>
          <tbody>
            {rowDataObj}
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }

}

export default Tables
