import React, { useState, useEffect, Component } from 'react';

const Tables = (props) => {
  

// useEffect(() => {
//     console.log(props.dataSet[0])
//     // setColumns(Object.keys(props.dataSet[0]))

// }, [props.dataSet])
let headers = [];
let dataObj = [];
let rowDataObj = [];
let allTables = [];
let columns = [];
for (let i = 0; i < props.dataSet.length; i++){  
    console.log(props.dataSet[i]) 
    if (props.dataSet[i].length != 0){
        headers = [];
        dataObj = [];
        rowDataObj = [];
        columns = Object.keys(props.dataSet[i][0])
        for (let j = 0; j < columns.length; j++) {
        headers.push(<th key={j}>{columns[j]}</th>)
        };
        for (let j = 0; j < props.dataSet[i].length; j++) {
            dataObj.push([])
            for (let key in props.dataSet[i][j]){
                dataObj[j].push(<td key={`${key}${j}`}>{props.dataSet[i][j][key]}</td>)
            }
        };
        for (let j = 0; j < dataObj.length; j++) {
            rowDataObj.push(
                <tr>
                    {dataObj[j]}
                </tr>
            )
        }
        allTables.push(
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
        )
    }
}




return (
    <div className="container">
      {allTables}
    </div>
  )
}

export default Tables