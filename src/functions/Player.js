import GameBoard from './GameBoard'
import {findAvailableMoves, findAllShipHits} from './Helper'

const Player = (playerIndex, turn) => {

  const myBoard = GameBoard();
  let myTurn = turn;

  const setPlayer = (gameBoard, hitBoard, ships) => {
    myBoard.setHitBoard(hitBoard);
    myBoard.setGameBoard(gameBoard);
    myBoard.setShips(ships);
  }

  const attackOpp = (move, oppPlayer) => {
    oppPlayer.receiveAttack(move);
  }

  const receiveAttack = (attack) => {
    return myBoard.receiveAttack(attack);
  }

  const haveLost = () => {
    return myBoard.getAllSunk();
  }

  const addShip = (ship) => {
    myBoard.addShipToBoard(ship);
  }

  const getHitBoard = () => {
    return myBoard.getHitBoard();
  }


  const smartMove = (oppHitBoard) => {
    const available = findAvailableMoves(oppHitBoard);
    const shipHits = findAllShipHits(oppHitBoard);
    // Preferably, attack next to a ship hit
    // check if a side is already a ship hit -> that way if parallel side is available, choose it 
    for (let i = 0; i<shipHits.length; i++){
      let location = shipHits[i];
      let sidesArray = [location-1, location-10, location+1,location+10];
      sidesArray = removeWrongHorSides(sidesArray, location);
      let sideLength = sidesArray.length;
      for (let j = 0; j<sidesArray.length; j++){
        let side = sidesArray[j];
        if (shipHits.includes(side) && available.includes(sidesArray[(j+(sideLength/2))%sideLength])){
          return sidesArray[(j+2)%4];
        }
      }
    }
    // all sides are not ship hits, so choose available side if there is available
    for (let i = 0; i<shipHits.length; i++){
      let location = shipHits[i];
      let sidesArray = [location-1, location-10, location+1,location+10];
      sidesArray = removeWrongHorSides(sidesArray, location);
      for (let j = 0; j<sidesArray.length; j++){
        let side = sidesArray[j];
        if (available.includes(side)){
          return side;
        }
      }
    }
    return available[Math.floor(Math.random() * available.length)];
  }

  const removeWrongHorSides = (arr,location) => {
    // for example if there is 50,51 don't put 49
    if (Math.floor(arr[0]/10)!== Math.floor(location/10) || Math.floor(arr[2]/10)!== Math.floor(location/10)){
      return [arr[1],arr[3]];
    }
    return arr;
  }


  const toggleTurn = () => !myTurn;

  const getBoard = () => myBoard;

  return {getBoard, toggleTurn, smartMove, attackOpp, haveLost, addShip, getHitBoard, receiveAttack, setPlayer};

}

export default Player;