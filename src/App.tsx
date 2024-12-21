import { useState } from 'react';
import JoinGame from './components/JoinGame';
import GameState from './components/GameState';
import PlayerCard from './components/PlayerCard';
import StartGame from './components/StartGame';
import Display from './components/Display';
import { GameStatus, Status } from './types';

const App = () => {
  const [gameState, setGameState] = useState<GameState | undefined>(undefined);
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
      <GameState
        gameId={gameId}
        playerName={playerName}
        setGameState={setGameState}
        gameState={gameState}
      />
      {gameState && gameState.gameStatus === Status.WAITING && (
        <StartGame gameId={gameId} setGameStatus={setGameStatus} />
      )}
      {gameState &&
        (gameState.gameStatus === Status.CLUE ||
          gameState.gameStatus === Status.VOTE) && (
          <>
            <PlayerCard
              gameId={gameId}
              playerName={playerName}
              setWord={setWord}
              word={word}
              currentRoundIndex={gameState.currentRoundIndex}
              playerOrder={gameState.playerOrder}
              clues={gameState.clues}
              votes={gameState.votes}
              gameStatus={gameState.gameStatus}
            />
            <Display gameState={gameState} />
          </>
        )}
      {gameStatus === GameStatus.COMPLETE && <>Results here</>}
    </>
  );
};

export default App;
