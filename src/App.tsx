import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CreateGame from './components/CreateGame';
import JoinGame from './components/JoinGame';
import { WebSocket } from 'socket.io-client';
import useWebSocket from 'react-use-websocket';
import GameState from './components/GameState';

const App = () => {
  const [gameState, setGameState] = useState({});
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
