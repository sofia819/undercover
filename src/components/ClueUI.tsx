import { useState } from 'react';
import { submitClue } from '../Request';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

interface Props {
  gameId: string;
  playerName: string;
  isPlayerTurn: boolean;
}

const ClueUI = ({ gameId, playerName, isPlayerTurn }: Props) => {
  const [clueInput, setClueInput] = useState('');
  const handleInput = (inputText: string) => setClueInput(inputText);

  const handleClick = () => {
    submitClue(gameId, playerName, clueInput);
    setClueInput('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Stack
        direction='row'
        spacing={1}
        sx={{
          width: '30%',
        }}
      >
        <TextField
          value={clueInput}
          onChange={(e) => handleInput(e.target.value)}
          placeholder='Clue'
          disabled={!isPlayerTurn}
        />
        <Button
          onClick={handleClick}
          disabled={!isPlayerTurn || clueInput.length === 0}
          variant='contained'
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default ClueUI;
