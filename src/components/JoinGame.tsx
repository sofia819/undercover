import axios from 'axios';
import { useEffect, useState } from 'react';

interface Props {
  setPlayerName: Function;
  setGameId: Function;
  setGameState: Function;
  playerName: string;
  gameId: string;
}

const JoinGame = ({
  setPlayerName,
  setGameId,
  setGameState,
  playerName,
  gameId,
}: Props) => {
  const [gameIdInput, setGameIdInput] = useState('');
  const [playerNameInput, setPlayerNameInput] = useState('');

  useEffect(() => {
    setGameIdInput(gameId);
  }, [gameId]);

  useEffect(() => {
    setPlayerNameInput(playerName);
  }, [playerName]);

  const joinGame = () => {
    axios
      .post(`http://[::1]:5000/${gameIdInput}/${playerNameInput}`)
      .catch((err) => console.error(err));

    setGameId(gameIdInput);
    setPlayerName(playerNameInput);

    axios
      .get(`http://[::1]:5000/${gameIdInput}`)
      .then(({ data }) => setGameState(data))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div>
        <input
          onChange={(e) => setGameIdInput(e.target.value)}
          defaultValue={gameId}
        />
        <input
          onChange={(e) => setPlayerNameInput(e.target.value)}
          defaultValue={playerName}
        />
        <button
          onClick={joinGame}
          disabled={gameIdInput === '' || playerNameInput === ''}
        >
          Join game
        </button>
      </div>
    </>
  );
};

export default JoinGame;
