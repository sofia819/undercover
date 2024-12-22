import { GameState, Status } from '../types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface Props {
  gameId: string;
  playerName: string;
  gameState: GameState | undefined;
}

const GameInfo = ({ gameId, playerName, gameState }: Props) => {
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
          <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 16 }}>
            Player: {playerName}
          </Typography>
          <Typography
            gutterBottom
            sx={{ color: 'text.secondary', fontSize: 14 }}
          >
            Status: {gameStatus}
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
            {`Round ${
              currentRoundIndex +
              (gameStatus !== Status.CIVILIAN_WON &&
              gameStatus !== Status.SPY_WON
                ? 1
                : 0)
            }
        / ${maxRoundIndex + 1}`}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default GameInfo;
