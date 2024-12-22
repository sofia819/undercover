import { useEffect, useState } from 'react';
import { createGame, joinGame } from '../Request';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
      <Stack
        direction='column'
        spacing={1}
        sx={{
          alignSelf: 'center',
          width: '30%',
        }}
      >
        {(gameId === '' || playerName === '') && (
          <>
            <TextField
              onChange={(e) => setGameIdInput(e.target.value)}
              value={gameIdInput}
              placeholder='Game ID'
            />
            <TextField
              onChange={(e) => setPlayerNameInput(e.target.value)}
              value={playerNameInput}
              placeholder='Player Name'
            />
            <Button
              onClick={handleClick}
              disabled={playerNameInput === ''}
              variant='contained'
            >
              Join or create game
            </Button>
          </>
        )}
      </Stack>
    </>
  );
};

export default JoinGame;
