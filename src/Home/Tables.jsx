import React, { useState, useEffect, Component } from 'react';

const Tables = (props) => {
  const headers = [];
  const dataObj = [];
  const rowDataObj = [];


  if (props.dataSet) {
    if (props.dataSet.length != 0) {
      const columns = Object.keys(props.dataSet[0]);
      for (let i = 0; i < columns.length; i++) {
        headers.push(<th key={i}>{columns[i]}</th>)
      };

      for (let i = 0; i < props.dataSet.length; i++) {
        dataObj.push([])
        for (let key in props.dataSet[i]) {
          dataObj[i].push(<td key={`${key}${i}`}>{props.dataSet[i][key]}</td>)
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

  if (props.dataSet) {
    return (
      <div className="container">
        <table>
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
      <div className="container">Loading...</div>
    )
  }

}

export default Tables