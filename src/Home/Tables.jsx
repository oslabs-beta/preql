import React, { useState, useEffect, Component } from 'react';

const Tables = (props) => {
  const headers = [];
  const dataObj = [];
  const rowDataObj = [];
      
  if (props.dataSet){
    const columns = Object.keys(props.dataSet[0]);
      for (let i = 0; i < columns.length; i++) {
        headers.push(<th key={i}>{columns[i]}</th>)
      };
      
      for (let i = 0; i < props.dataSet.length; i++) {
        dataObj.push([])
        for (let key in props.dataSet[i]){
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



  if(props.dataSet){
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



// useEffect(() => {
//     console.log(props.dataSet[0])
//     // setColumns(Object.keys(props.dataSet[0]))

// }, [props.dataSet])
// let headers = [];
// let dataObj = [];
// let rowDataObj = [];
// let allTables = [];
// let columns = [];
// for (let i = 0; i < props.dataSet.length; i++){  
//     console.log(props.dataSet[i]) 
//     if (props.dataSet[i].length != 0){
//         headers = [];
//         dataObj = [];
//         rowDataObj = [];
//         columns = Object.keys(props.dataSet[i][0])
//         for (let j = 0; j < columns.length; j++) {
//         headers.push(<th key={j}>{columns[j]}</th>)
//         };
//         for (let j = 0; j < props.dataSet[i].length; j++) {
//             dataObj.push([])
//             for (let key in props.dataSet[i][j]){
//                 dataObj[j].push(<td key={`${key}${j}`}>{props.dataSet[i][j][key]}</td>)
//             }
//         };
//         for (let j = 0; j < dataObj.length; j++) {
//             rowDataObj.push(
//                 <tr>
//                     {dataObj[j]}
//                 </tr>
//             )
//         }
//         allTables.push(
//             <table>
//             <thead>
//                 <tr>
//                     {headers}
//                 </tr>
//             </thead>
//             <tbody>
//                 {rowDataObj}
//             </tbody>
//             </table>
//         )
//     }
// }