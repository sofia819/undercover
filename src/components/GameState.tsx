import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

interface Props {
  gameId: string;
  playerName: string;
  setGameState: Function;
  gameState: any;
}

const GameState = ({ gameId, playerName, setGameState, gameState }: Props) => {
  const { sendMessage, lastJsonMessage, readyState } = useWebSocket(
    `http://[::1]:5000/${gameId}/${playerName}`,
    { onOpen: () => setGameState(lastJsonMessage) }
  );

  useEffect(() => {
    setGameState(lastJsonMessage);
  }, [lastJsonMessage]);

  return <>{JSON.stringify(gameState)}</>;
};

export default GameState;
