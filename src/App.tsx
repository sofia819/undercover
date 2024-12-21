import { useState } from 'react';
import JoinGame from './components/JoinGame';
import GameState from './components/GameState';
import PlayerCard from './components/PlayerCard';
import StartGame from './components/StartGame';
import Display from './components/Display';
import GameResult from './components/GameResult';
import { Status } from './types';

const App = () => {
  const [gameState, setGameState] = useState<GameState | undefined>(undefined);
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
      />
      <GameState
        gameId={gameId}
        playerName={playerName}
        setGameState={setGameState}
        gameState={gameState}
      />
      {gameState && gameState.gameStatus === Status.WAITING && (
        <StartGame gameId={gameId} />
      )}
      {gameState &&
        (gameState.gameStatus === Status.CLUE ||
          gameState.gameStatus === Status.VOTE) && (
          <>
            <PlayerCard
              gameId={gameId}
              player={gameState.players[playerName]}
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
      {gameState && gameState.gameStatus === Status.COMPLETE && (
        <GameResult players={Object.values(gameState.players)} />
      )}
    </>
  );
};

export default App;
