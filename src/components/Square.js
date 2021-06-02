import React, { useState, useEffect } from 'react';

const Square = (props) => {
  
  const [myDiv, setMyDiv] = useState(<div className="board-square board-square-available" onClick ={props.sendAttack}></div>);

  const computerClasses = [
    "board-square board-square-available display-hover",
    "board-square board-square-miss",
    "board-square board-square-hit"
  ];
  let isShip = "";
  if (props.ship === true){
    isShip = "square-isShip";
  }
  const playerClasses = [
    "board-square board-square-available "+isShip,
    "board-square board-square-miss "+isShip,
    "board-square board-square-hit "
  ];

  const myClasses = props.player === "0" ? playerClasses : computerClasses;

  useEffect(() => {
    if (props.type === 'available'){
      setMyDiv(<div className={myClasses[0]} data-index={props.index} onClick ={props.sendAttack}></div>)
    } else if (props.type === 'miss'){
      setMyDiv(<div className={myClasses[1]}></div>)
    } else {
      setMyDiv(<div className={myClasses[2]}></div>)
    }
  }, [props])

  return (myDiv);
}

export default Square;