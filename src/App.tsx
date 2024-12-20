import { useState } from 'react';
import CreateGame from './components/CreateGame';
import JoinGame from './components/JoinGame';
import GameState from './components/GameState';

const App = () => {
  const [gameState, setGameState] = useState(null);
  const [gameId, setGameId] = useState('');
  const [playerName, setPlayerName] = useState('');

  return (
    <>
      <CreateGame setGameId={setGameId} gameId={gameId} />
      <JoinGame
        setPlayerName={setPlayerName}
        setGameId={setGameId}
        playerName={playerName}
        gameId={gameId}
      />
      <>
        {gameId !== '' && playerName !== '' && (
          <GameState
            gameId={gameId}
            playerName={playerName}
            setGameState={setGameState}
            gameState={gameState}
          />
        )}
      </>
    </>
  );
};

export default App;
