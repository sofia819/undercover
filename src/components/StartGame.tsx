import { startGame } from '../Request';
import { GameStatus } from '../types';

interface Props {
  gameId: string;
  setGameStatus: Function;
}

const StartGame = ({ gameId, setGameStatus }: Props) => {
  const handleStart = () => {
    startGame(gameId);
    setGameStatus(GameStatus.CLUE);
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
