import { createGame } from '../Request';
import Button from '@mui/material/Button';

interface Props {
  setGameId: Function;
  gameId: string;
  playerNameInput: string;
}

const CreateGame = ({ setGameId, gameId, playerNameInput }: Props) => {
  const handleCreateGame = () => {
    setGameId(createGame(playerNameInput));
  };

  return (
    <>
      {gameId === '' && (
        <Button onClick={handleCreateGame} disabled={playerNameInput === ''}>
          Create Game
        </Button>
      )}
    </>
  );
};

export default CreateGame;
