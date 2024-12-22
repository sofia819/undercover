import { startGame } from '../Request';
import Button from '@mui/material/Button';

interface Props {
  gameId: string;
  hasEnoughPlayers: boolean;
}

const StartGame = ({ gameId, hasEnoughPlayers }: Props) => {
  const handleStart = () => {
    startGame(gameId);
  };

  return (
    <>
      {gameId !== '' && (
        <Button
          onClick={handleStart}
          disabled={!hasEnoughPlayers}
          variant='contained'
          sx={{ width: '50%', alignSelf: 'center' }}
        >
          Start Game
        </Button>
      )}
    </>
  );
};

export default StartGame;
