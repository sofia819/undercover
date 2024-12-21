import { startGame } from '../Request';

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
        <div>
          <button onClick={handleStart} disabled={!hasEnoughPlayers}>
            Start Game
          </button>
        </div>
      )}
    </>
  );
};

export default StartGame;
