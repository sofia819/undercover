import { restartGame } from '../Request';
import Button from '@mui/material/Button';

interface Props {
  gameId: string;
  hasEnoughPlayers: boolean;
}

const RestartGame = ({ gameId, hasEnoughPlayers }: Props) => {
  const handleRestart = () => {
    restartGame(gameId);
  };

  return (
    <>
      {gameId !== '' && (
        <Button
          onClick={handleRestart}
          disabled={!hasEnoughPlayers}
          variant='contained'
          sx={{ width: '50%', alignSelf: 'center' }}
        >
          Restart Game
        </Button>
      )}
    </>
  );
};

export default RestartGame;
