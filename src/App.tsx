import { useState } from 'react';
import JoinGame from './components/JoinGame';
import GameState from './components/GameState';
import PlayerCard from './components/PlayerCard';
import Display from './components/Display';
import { Status } from './types';
import { connectWebsocket } from './Request';
import { ReadyState } from 'react-use-websocket';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '100vh', // Full viewport height
        }}
      >
        {gameId === '' && playerName === '' && (
          <JoinGame
            setPlayerName={setPlayerName}
            setGameId={setGameId}
            playerName={playerName}
            gameId={gameId}
          />
        )}
        <GameState
          gameId={gameId}
          playerName={playerName}
          setGameState={setGameState}
          gameState={gameState}
        />
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
      </Box>
    </>
  );
};

export default App;
