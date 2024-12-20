import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { GameState } from '../types';
import Player from './Player';

interface Props {
  gameId: string;
  playerName: string;
  setGameState: Function;
  gameState: GameState | null;
}

const GameState = ({ gameId, playerName, setGameState, gameState }: Props) => {
  const { lastJsonMessage } = useWebSocket(
    `http://[::1]:5000/${gameId}/${playerName}`,
    { onOpen: () => setGameState(lastJsonMessage) }
  );

  useEffect(() => {
    setGameState(lastJsonMessage);
  }, [lastJsonMessage]);

  if (gameState == null) {
    return <></>;
  }

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
          <Player
            player={players[player]}
            clues={clues.map((clue) => clue[player])}
            votes={votes.map((vote) => vote[player])}
          />
        );
      })}
    </>
  );
};

export default GameState;
