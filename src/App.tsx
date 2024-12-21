import { useState } from 'react';
import CreateGame from './components/CreateGame';
import JoinGame from './components/JoinGame';
import GameState from './components/GameState';
import PlayerCard from './components/PlayerCard';
import StartGame from './components/StartGame';
import { Status } from './types';

const App = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [gameId, setGameId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [word, setWord] = useState('');

  return (
    <>
      {playerName === '' && (
        <>
          <CreateGame setGameId={setGameId} gameId={gameId} />
          <JoinGame
            setPlayerName={setPlayerName}
            setGameId={setGameId}
            setGameState={setGameState}
            playerName={playerName}
            gameId={gameId}
          />
        </>
      )}
      {gameId !== '' &&
      playerName !== '' &&
      gameState?.gameStatus === Status.WAITING ? (
        <StartGame gameId={gameId} setGameState={setGameState} />
      ) : (
        <>
          <PlayerCard
            gameId={gameId}
            playerName={playerName}
            setWord={setWord}
            word={word}
          />
        </>
      )}
      {gameState && (
        <GameState
          gameId={gameId}
          playerName={playerName}
          setGameState={setGameState}
          gameState={gameState}
        />
      )}
    </>
  );
};

export default App;
