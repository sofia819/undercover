import { useEffect } from 'react';
import { GameState, MessageType, Status } from '../types';
import { connectWebsocket } from '../Request';
import { ReadyState } from 'react-use-websocket';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface Props {
  gameId: string;
  playerName: string;
  setGameState: Function;
  gameState: GameState | undefined;
}

const GameInfo = ({ gameId, playerName, setGameState, gameState }: Props) => {
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

  const { gameStatus, currentRoundIndex, maxRoundIndex } = gameState;

  return (
    <>
      <Card sx={{ justifyItems: 'center' }}>
        <CardContent>
          <Typography variant='h5' component='div'>
            Game: {gameId}
          </Typography>
          <Typography
            gutterBottom
            sx={{ color: 'text.secondary', fontSize: 14 }}
          >
            Status: {gameStatus}
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
            {`Round ${
              currentRoundIndex +
              (gameStatus !== Status.CIVILIAN_WON &&
              gameStatus !== Status.SPY_WON
                ? 1
                : 0)
            }
        / ${maxRoundIndex + 1}`}
          </Typography>
          <Typography
            gutterBottom
            sx={{ color: 'text.secondary', fontSize: 14 }}
          >
            You are player: {playerName}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default GameInfo;
