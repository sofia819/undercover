import { useState } from 'react';
import JoinGame from './components/JoinGame';
import GameState from './components/GameState';
import PlayerCard from './components/PlayerCard';
import StartGame from './components/StartGame';
import Display from './components/Display';
import GameResult from './components/GameResult';
import RestartGame from './components/RestartGame';
import { Status } from './types';
import { connectWebsocket } from './Request';
import { ReadyState } from 'react-use-websocket';

const App = () => {
  const { readyState } = connectWebsocket();
  const [gameState, setGameState] = useState<GameState | undefined>(undefined);
  const [gameId, setGameId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [word, setWord] = useState('');

  if (readyState !== ReadyState.OPEN) {
    return <>Loading...</>;
  }

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
        <StartGame
          gameId={gameId}
          hasEnoughPlayers={Object.keys(gameState.players || {}).length >= 3}
        />
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
              players={gameState.playerOrder}
            />
            <Display gameState={gameState} />
          </>
        )}
      {gameState &&
        (gameState.gameStatus === Status.CIVILIAN_WON ||
          gameState.gameStatus === Status.SPY_WON) && (
          <>
            <GameResult gameStatus={gameState.gameStatus} />
            <RestartGame
              gameId={gameId}
              hasEnoughPlayers={Object.keys(gameState.players).length >= 3}
            />
          </>
        )}
    </>
  );
};

export default App;
