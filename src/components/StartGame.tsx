import { startGame } from '../Request';

interface Props {
  gameId: string;
}

const StartGame = ({ gameId }: Props) => {
  const handleStart = () => {
    startGame(gameId);
  };

  return (
    <>
      {gameId !== '' && (
        <div>
          <button onClick={handleStart}>Start Game</button>
        </div>
      )}
    </>
  );
};

export default StartGame;
