import { useEffect } from 'react';
import { GameState, MessageType, Status } from '../types';
import { connectWebsocket } from '../Request';
import { ReadyState } from 'react-use-websocket';
import StartGame from './StartGame';
import GameInfo from './GameInfo';
import Stack from '@mui/material/Stack';
import RestartGame from './RestartGame';

interface Props {
  gameId: string;
  playerName: string;
  setGameState: Function;
  gameState: GameState | undefined;
}

const GameState = ({ gameId, playerName, setGameState, gameState }: Props) => {
  const { readyState, lastJsonMessage, sendJsonMessage } = connectWebsocket();

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

  if (!gameState) {
    return <></>;
  }

  return (
    // <Container sx={{ width: '50%', alignSelf: 'center' }}>
    <Stack
      direction='column'
      spacing={1}
      sx={{
        alignSelf: 'center',
        width: '50%',
      }}
    >
      <GameInfo
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
      {(gameState.gameStatus === Status.CIVILIAN_WON ||
        gameState.gameStatus === Status.SPY_WON) && (
        <>
          <RestartGame
            gameId={gameId}
            hasEnoughPlayers={Object.keys(gameState.players).length >= 3}
          />
        </>
      )}
    </Stack>
    // </Container>
  );
};

export default GameState;
