import { createGame } from '../Request';

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
        <button onClick={handleCreateGame} disabled={playerNameInput === ''}>
          Create Game
        </button>
      )}
    </>
  );
};

export default CreateGame;
