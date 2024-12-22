import { useState, useEffect } from 'react';
import JoinGame from './components/JoinGame';
import GameUI from './components/GameUI';
import PlayerInfo from './components/PlayerInfo';
import { Status, MessageType, GameState } from './types';
import { connectWebsocket } from './Request';
import { ReadyState } from 'react-use-websocket';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ControlUI from './components/ControlUI';

const App = () => {
  const {
    readyState,
    lastJsonMessage,
    sendJsonMessage,
  }: {
    readyState: ReadyState;
    lastJsonMessage: GameState;
    sendJsonMessage: Function;
  } = connectWebsocket();
  const [gameState, setGameState] = useState<GameState | undefined>(undefined);
  const [gameId, setGameId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [word, setWord] = useState('');

  useEffect(() => {
    if (gameId !== '' && playerName !== '') {
      sendJsonMessage({
        type: MessageType.CONNECTED,
        gameId,
        playerName,
      });
    }
  }, [gameId, playerName]);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      setGameState(lastJsonMessage);
    }
  }, [lastJsonMessage]);

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
          gameState && (
            <Stack
              direction='column'
              spacing={1}
              sx={{
                width: '100%',
              }}
            >
              <GameUI
                gameId={gameId}
                playerName={playerName}
                gameState={gameState}
              />
              <PlayerInfo gameState={gameState} />
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
          )
        )}
      </Box>
    </>
  );
};

export default App;
