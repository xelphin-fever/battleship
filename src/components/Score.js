import React, { useState, useEffect} from 'react';

const Score = (props) => {

  const player = props.playerIndex === "0" ? "You" : "Computer";
  const [amountSunk, setAmountSunk] = useState(props.opp.getBoard().checkAmountSunk());
  const [missed, setMissed] = useState(0);
  const [hit, setHit] = useState(0);

  useEffect(()=> {
    setAmountSunk(props.opp.getBoard().checkAmountSunk());
    setMissed((props.opp.getHitBoard().filter(value => Number(value) === 0)).length);
    setHit((props.opp.getHitBoard().filter(value => Number(value) === 1)).length);
  }, [props])

  return (
    <div className="score">
      <h2> <span>{player}</span> </h2>
      <h3> Missed: <span>{missed}</span> </h3>
      <h3> Hit: <span>{hit}</span> </h3>
      <h3> Sunk: <span>{amountSunk}</span> </h3>
    </div>
  );
}

export default Score;