import axios from 'axios';
import { useEffect, useState } from 'react';

interface Props {
  setPlayerName: Function;
  setGameId: Function;
  playerName: string;
  gameId: string;
}

const JoinGame = ({ setPlayerName, setGameId, playerName, gameId }: Props) => {
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
  };

  return (
    <>
      {gameId === '' || playerName === '' ? (
        <>
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
        </>
      ) : (
        <h3>Hello, {playerName}</h3>
      )}
    </>
  );
};

export default JoinGame;
