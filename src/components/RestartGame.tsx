import { restartGame } from '../Request';

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
        <div>
          <button onClick={handleRestart} disabled={!hasEnoughPlayers}>
            Restart Game
          </button>
        </div>
      )}
    </>
  );
};

export default RestartGame;
