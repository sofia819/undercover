import { useEffect, useState } from 'react';
import { createGame, joinGame } from '../Request';

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

  const handleClick = async () => {
    if (gameId === '' && gameIdInput === '') {
      const createdGameId = await createGame(playerNameInput).then(
        (response) => response.data
      );
      setGameId(createdGameId);
      setPlayerName(playerNameInput);
      return;
    }

    joinGame(gameIdInput, playerNameInput)
      .then(() => {
        setGameId(gameIdInput);
        setPlayerName(playerNameInput);
      })
      .catch(
        ({
          response: {
            data: { type },
          },
        }) => {
          console.log(type);
          setGameIdInput('');
        }
      );
  };

  return (
    <>
      {(gameId === '' || playerName === '') && (
        <div>
          <input
            onChange={(e) => setGameIdInput(e.target.value)}
            value={gameIdInput}
          />
          <input
            onChange={(e) => setPlayerNameInput(e.target.value)}
            value={playerNameInput}
          />
          <button onClick={handleClick} disabled={playerNameInput === ''}>
            Join or create game
          </button>
        </div>
      )}
    </>
  );
};

export default JoinGame;
