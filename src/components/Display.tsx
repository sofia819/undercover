import { GameState, Status } from '../types';
import Result from './Result';

interface Props {
  gameState: GameState | undefined;
}

const Display = ({ gameState }: Props) => {
  if (!gameState) {
    return <></>;
  }

  const { players, playerOrder, clues, votes } = gameState;

  return (
    <>
      {(gameState.gameStatus === Status.CLUE ||
        gameState.gameStatus === Status.VOTE) &&
        playerOrder.map((player) => {
          return (
            <Result
              player={players[player]}
              clues={clues.map((clue) => clue[player]) || []}
              votes={
                Object.values(votes || {}).map((vote) => vote[player]) || []
              }
            />
          );
        })}
    </>
  );
};

export default Display;
