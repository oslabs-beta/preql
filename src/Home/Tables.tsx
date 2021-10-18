import React, { useState, useEffect, Component, FC } from 'react';
import ReactCSSTransitionGroup from 'react-transition-group'

const Tables = (props: any) => {
  const headers = [];
  const dataObj = [];
  const rowDataObj = [];
  const table = props.dataSet[props.displayData[0]]
  const table2 = props.dataSet[props.displayData[1]]

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
  if (table2) {
    if (table2.length != 0) {
      const columns = Object.keys(table2[0]);
      for (let i = 0; i < columns.length; i++) {
        headers.push(<th key={`${2}${i}`}>{columns[i]}</th>)
      };

      for (let i = 0; i < table2.length; i++) {
        dataObj.push([])
        for (let key in table2[i]) {
          dataObj[i].push(<td key={`${2}${key}${i}`}>{table2[i][key]}</td>)
        }
      };
      for (let i = 0; i < dataObj.length; i++) {
        rowDataObj.push(
          <tr key={`${2}rowdata${i}`}>
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
