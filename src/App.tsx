import { useState } from 'react';
import JoinGame from './components/JoinGame';
import GameState from './components/GameState';
import Display from './components/Display';
import { Status } from './types';
import { connectWebsocket } from './Request';
import { ReadyState } from 'react-use-websocket';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ControlUI from './components/ControlUI';

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
        {gameId === '' && playerName === '' ? (
          <JoinGame
            setPlayerName={setPlayerName}
            setGameId={setGameId}
            playerName={playerName}
            gameId={gameId}
          />
        ) : (
          <Stack
            direction='column'
            spacing={1}
            sx={{
              // alignSelf: 'center',
              width: '100%',
            }}
          >
            <GameState
              gameId={gameId}
              playerName={playerName}
              setGameState={setGameState}
              gameState={gameState}
            />
            <Display gameState={gameState} />
            {gameState &&
              (gameState.gameStatus === Status.CLUE ||
                gameState.gameStatus === Status.VOTE) && (
                <ControlUI
                  player={gameState.players[playerName]}
                  setWord={setWord}
                  word={word}
                  gameState={gameState}
                />
              )}
          </Stack>
        )}
      </Box>
    </>
  );
};

export default App;
