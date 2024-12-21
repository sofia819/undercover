import { useEffect } from 'react';
import { GameState, MessageType, Status } from '../types';
import { connectWebsocket } from '../Request';
import { ReadyState } from 'react-use-websocket';

interface Props {
  gameId: string;
  playerName: string;
  setGameState: Function;
  gameState: GameState | undefined;
}

const GameState = ({ gameId, playerName, setGameState, gameState }: Props) => {
  const { readyState, lastJsonMessage, sendJsonMessage } = connectWebsocket();

  useEffect(() => {
    if (gameId !== '' && playerName !== '') {
      sendJsonMessage({
        type: MessageType.CONNECTED,
        gameId,
        playerName,
      });
    }
  }, [gameId, playerName]);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      setGameState(lastJsonMessage);
    }
  }, [lastJsonMessage]);

  if (!gameState) {
    return <></>;
  }

  const { gameStatus, currentRoundIndex, maxRoundIndex } = gameState;

  return (
    <>
      <h3>GameId: {gameId}</h3>
      <h3>status: {gameStatus}</h3>
      <h3>
        {`Round ${
          currentRoundIndex +
          (gameStatus !== Status.CIVILIAN_WON && gameStatus !== Status.SPY_WON
            ? 1
            : 0)
        }
        / ${maxRoundIndex + 1}`}
      </h3>
      <h4>You are player: {playerName}</h4>
    </>
  );
};

export default GameState;
