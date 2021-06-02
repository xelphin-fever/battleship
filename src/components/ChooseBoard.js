import React, { useState, useEffect, useRef } from 'react';
import BasicSquare from './BasicSquare';
import {makeVertical, makeHorizontal, checkPositionAvailable} from '../functions/Helper'

const ChooseBoard = (props) => { 
  const [finished, setFinished] = useState(false);
  const [currentShipIndex, setCurrentShipIndex] = useState(0);
  const [shipSize, setShipSize] = useState(props.shipSizes[currentShipIndex]); // [5,4,4,3,3,2,2]
  const [onHor, setOnHor] = useState(true); // horizontal/vertical
  const [myShipArray, setMyShipArray] = useState([]);

  const [helperBoard, setHelperBoard] = useState(new Array(100).fill(-1));
  // 0 -> highlight
  // 1 -> actually added
    
  const getMouseLocation = (location)=> {
    let copyHelperBoard = resetHighlights();
    let shipArray;
    if (onHor===true){
      shipArray = makeHorizontal(location,shipSize);
    } else {
      shipArray = makeVertical(location,shipSize);
    }
    if (checkPositionAvailable(shipArray, copyHelperBoard)){
      shipArray.forEach((location) => {
        copyHelperBoard[location] = 0;
      })
    } else {
      copyHelperBoard.map((location) => {
        if (location=== 0){
          return -1;
        }
        return location;
      })
    }
    setHelperBoard(copyHelperBoard);
  }

  const resetHighlights = () => {
    let copyHelperBoard = [...helperBoard];
    copyHelperBoard = copyHelperBoard.map((location) => {
      if (location === 0){
        return -1;
      }
      return location;
    })
    setHelperBoard(copyHelperBoard); // got rid of all highlights (0)
    return copyHelperBoard;
  }

  const addShip = (location) => {
    let copyHelperBoard = resetHighlights();
    let shipArray;
    if (onHor===true){
      shipArray = makeHorizontal(location,shipSize);
    } else {
      shipArray = makeVertical(location,shipSize);
    }
    if (checkPositionAvailable(shipArray, copyHelperBoard)){
      shipArray.forEach((location) => {
        copyHelperBoard[location] = 1;
      })
      let copyMyShipArray = [...myShipArray];
      copyMyShipArray.push(shipArray);
      setMyShipArray(copyMyShipArray);
      if (copyMyShipArray.length === props.shipSizes.length){
        props.finished(copyMyShipArray);
      }
      setShipSize(props.shipSizes[currentShipIndex+1]);
      setCurrentShipIndex(currentShipIndex+1);
    }
    setHelperBoard(copyHelperBoard);
  }

  return (
    <div className ="choose-board">
      <div className = "board">
          {
            helperBoard.map((location, index) => {
              if (location === -1){
                return <BasicSquare key={index} index={index} active={false} sendEvent={getMouseLocation} sendClick={addShip} />
              }
              return <BasicSquare key={index} index={index} active={true} sendEvent={getMouseLocation} sendClick={addShip}/>
            })
          }
      </div>
      <div>
        <button className = "button" onClick = {() => setOnHor(!onHor)}>Rotate Ship</button>
      </div>
    </div>
  );
}

export default ChooseBoard;