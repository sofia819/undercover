import { useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { GameState, Status } from '../types';
import Result from './Result';

interface Props {
  gameId: string;
  playerName: string;
  setGameState: Function;
  gameState: GameState;
}

const GameState = ({ gameId, playerName, setGameState, gameState }: Props) => {
  const { readyState, lastJsonMessage } = useWebSocket(
    `http://[::1]:5000/${gameId}/${playerName}`,
    {
      onOpen: () => console.log('connected'),
    }
  );

  useEffect(() => {
    // setGameState(lastJsonMessage);
    if (readyState === ReadyState.OPEN) {
      setGameState(lastJsonMessage);
    }
  }, [lastJsonMessage]);

  const {
    gameStatus,
    currentRoundIndex,
    maxRoundIndex,
    players,
    playerOrder,
    clues,
    votes,
  } = gameState;

  return (
    <>
      <h3>GameId: {gameId}</h3>
      <h3>status: {gameStatus}</h3>
      <div>
        Round {currentRoundIndex + 1} / {maxRoundIndex + 1}
      </div>
      {playerOrder.map((player) => {
        return (
          <Result
            player={players[player]}
            clues={clues.map((clue) => clue[player]) || []}
            votes={votes.map((vote) => vote[player]) || []}
          />
        );
      })}
    </>
  );
};

export default GameState;
