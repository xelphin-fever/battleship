import Ship from './Ship'
import {checkPositionAvailable} from './Helper'

const GameBoard = () => {
  // Board of just one player (each player has one)
  let allSunk = false;
  let gameBoard;
  let hitBoard;
  let myShips = []; // <- Fill with Ship objects
  
  // fill with -1s
  // every time add ship replace 0s with shipIndex at the appropriate indexs
  // ex. [...,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,...] -> [...,-1,2,2,2,2,-1,-1,-1,-1,4,4,-1,...]
  // (above both ships are horizontal obviously)

  // ACTIVATED ON INIT
  const createEmptyBoard = () => {
    gameBoard = new Array(100).fill(-1);
    hitBoard = new Array(100).fill(-1);
  }
  
  const addShipToBoard = (positionArray) => {
    const shipIndex = myShips.length;
    if (checkPositionAvailable(positionArray, gameBoard)){
      const newShip = Ship(shipIndex,positionArray);
      myShips = [...myShips, newShip];
      positionArray.forEach((location) => {
        gameBoard[location] = shipIndex;
      })
    }
    return gameBoard;
  }

  
  // Assumes location is valid 0..98,99
  const receiveAttack = (location) => {
    const valueHit = gameBoard[location];
    if (valueHit !== -1){
      const hitShip = myShips[valueHit];
      hitShip.hit(location);
      addToHitBoard(location,1);
    } else {
      addToHitBoard(location,0);
    }
    checkAllShipsSunk();
    return hitBoard;
  }

  const addToHitBoard = (location, value) => {
    // -1 -> Not hit yet
    // 0 -> Hit, Empty
    // 1 -> Hit, Ship
    hitBoard[location] = value;
  }

  const checkAllShipsSunk = () => {
    let ans=true;
    myShips.forEach((ship) => {
      if (ship.checkIsSunk()!==true){
        ans = false;
      } 
    });
    allSunk = ans;
  }

  const checkAmountSunk = () => {
    let count = 0;
    myShips.forEach((ship) => {
      if (ship.checkIsSunk() === true){
        count += 1;
      } 
    });
    return count;
  }

  const reset = () => {
    createEmptyBoard();
    allSunk = false;
    myShips =[];
  }

  const getGameBoard = () => gameBoard;
  const getAllSunk = () => allSunk;
  const getHitBoard = () => hitBoard;
  const getAllShips = () => myShips;

  const setHitBoard = (newHitBoard) => {
    hitBoard = newHitBoard;
  } 
  const setGameBoard = (newGameBoard) => {
    gameBoard = newGameBoard;
  }
  const setShips = (newShips) => {
    myShips = newShips;
  }

  // INIT
  createEmptyBoard(); 

  return {
    createEmptyBoard,
    addShipToBoard,
    receiveAttack, 
    getGameBoard, 
    getAllSunk, 
    getHitBoard, 
    getAllShips, 
    setHitBoard, 
    setGameBoard, 
    setShips,
    checkAmountSunk, 
  }

}

export default GameBoard;