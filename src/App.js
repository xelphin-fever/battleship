import React, { useState} from 'react';
import Game from './components/Game';
import ChooseBoard from './components/ChooseBoard';
import './App.css';

function App() {
  const shipSizes = [5,4,4,3,3,2,2,2];
  const [playerShipArrays, setPlayerShipArray] = useState([]);

  const [gameMode, setGameMode] = useState(false)

  const playerFinishedChoosing = (playerChoices) => {
    alert('Player Finished Choosing: ', playerChoices);
    console.log('Player Finished Choosing: ', playerChoices);
    setPlayerShipArray(playerChoices);
    setGameMode(true);
  }

  const restart = () => {
    setGameMode(false);
  }

  return (
    <div className="App">
      <div className="title-div">
        <h1>BATTLE-SHIP</h1>
      </div>
      <div>
        {
          gameMode === false 
            ? <ChooseBoard shipSizes={shipSizes} finished = {playerFinishedChoosing} />
            : <Game playerShips ={playerShipArrays} shipSizes={shipSizes} finish={restart}/>
        }
      </div>
    </div>
  );
}

export default App;
