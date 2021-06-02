import React, { useState, useEffect} from 'react';
import Board from './Board';
import Score from './Score';
import Player from '../functions/Player'
import {randomizeComputerShips} from '../functions/Helper'

const Game = (props) => {
  const [human, setHuman] = useState(Player(0,true));
  const [computer, setComputer] = useState(Player(1,false));
  const [humanBoard, setHumanBoard] = useState(new Array(100).fill(-1));
  const [computerBoard, setComputerBoard] = useState(new Array(100).fill(-1));
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  

  useEffect(() => {
    setGameOver(false);
    // Computer Set Ships
    let compShips = Player(1,false);
    const shipCompArrays = randomizeComputerShips(props.shipSizes);
    shipCompArrays.forEach((shipArray) => {
      compShips.addShip(shipArray);
    })
    setComputer(compShips);

    // Player Set Ships
    if (props.playerShips){
      let humanShip = Player(0,true);
      const shipPlayerArrays = props.playerShips;
      shipPlayerArrays.forEach((shipArray) => {
        humanShip.addShip(shipArray);
      })
      setHuman(humanShip);
    }
  },[props]);

  const sendAttack = (location, user) => {
    if (String(currentPlayer)!== user && gameOver!==true){
      console.log(`Attack on Player ${user} at ${location}`);
      let myUser = (user === "0" ? human : computer);
      let userCopy = Player(user,false);
      userCopy.setPlayer(
        myUser.getBoard().getGameBoard(),
        myUser.getBoard().getHitBoard(),
        myUser.getBoard().getAllShips()
      )
      const newHitBoard = userCopy.receiveAttack(Number(location));
      if (user === "0"){
        setHuman(userCopy);
        setHumanBoard(newHitBoard);
      } else {
        setComputer(userCopy);
        setComputerBoard(newHitBoard);
      }
      changeTurn();
    }
  }

  const changeTurn = () => {
    setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
  }

  useEffect(() => {
    const playerJustHit = currentPlayer === 0 ? computer : human;
    const hasPlayerLost = playerJustHit.haveLost();
    if (hasPlayerLost === true){
      console.log('Player ',playerJustHit,' has lost')
      setGameOver(true);
      setWinner(currentPlayer === 0 ? 'You' : 'Computer')
      
    }
    function wait() {
      if (currentPlayer === 1 ){
        const compMove = computer.smartMove(humanBoard);
        sendAttack(compMove, "0");
      }
    }
    setTimeout(wait, 200);
  },[currentPlayer])


  return (
    <div>
      {
        gameOver === false
          ? <div className="game">  
              <div className="game-boards">
                <Board hitBoard ={humanBoard} sendAttack={sendAttack} player="0"  gameBoard={human.getBoard().getGameBoard()}/>
                <Board hitBoard ={computerBoard} sendAttack={sendAttack} player="1" gameBoard={human.getBoard().getGameBoard()}/>
              </div>
              <div className="game-scores">
                <Score playerIndex={"0"} opp = {computer}/>
                <Score playerIndex={"1"} opp = {human}/>
              </div>
            </div>
          : <div className="winner-banner">
              <h1>The Winner Is <span>{winner}</span> </h1>
              <button className="button" onClick={() => props.finish()}>Play Again</button>
            </div>
      }
    </div>
  );
}

export default Game;