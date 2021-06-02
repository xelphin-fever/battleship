import React, { useState, useEffect } from 'react';
import Square from './Square';

const Board = (props) => { 

  const [hitBoard, setHitBoard] = useState(props.hitBoard);
  const [gameBoard, setGameBoard] = useState(props.gameBoard);

  useEffect(() => {
    setHitBoard(props.hitBoard);
    setGameBoard(props.gameBoard);
  }, [props])


  const sendAttack = (event) => {
    console.log(event.currentTarget.getAttribute('data-index'));
    props.sendAttack(event.currentTarget.getAttribute('data-index'), props.player);
  }

  return (
    <div className = "board">
      {
        hitBoard.map((location, index) => {
          let onShip=false;
          
          if (gameBoard[index]!==-1){
            onShip=true;
          }

          if (location === -1){
            return <Square key={index} active="true" type="available" index={index} sendAttack={sendAttack} player={props.player} ship={onShip}/>
          }
          if (location === 0){
            return <Square key={index} active="false" type="miss" index={index} player={props.player} ship={onShip}/>
          }
          return <Square key={index} active="false" type="hit" index={index} player={props.player} ship={onShip}/>
          
        })
      }
    </div>
  );
}

export default Board;