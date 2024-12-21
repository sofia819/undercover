import { useState } from 'react';
import JoinGame from './components/JoinGame';
import GameState from './components/GameState';
import PlayerCard from './components/PlayerCard';
import StartGame from './components/StartGame';
import { GameStatus } from './types';

const App = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.NONE);
  const [gameId, setGameId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [word, setWord] = useState('');

  return (
    <>
      <JoinGame
        setPlayerName={setPlayerName}
        setGameId={setGameId}
        playerName={playerName}
        gameId={gameId}
        setGameStatus={setGameStatus}
      />
      {gameStatus === GameStatus.WAITING && (
        <StartGame gameId={gameId} setGameStatus={setGameStatus} />
      )}
      {(gameStatus === GameStatus.CLUE || gameStatus === GameStatus.VOTE) && (
        <>
          <PlayerCard
            gameId={gameId}
            playerName={playerName}
            setWord={setWord}
            word={word}
          />
          <GameState
            gameId={gameId}
            playerName={playerName}
            setGameState={setGameState}
            gameState={gameState}
          />
        </>
      )}
      {gameStatus === GameStatus.COMPLETE && <>Results here</>}
    </>
  );
};

export default App;
