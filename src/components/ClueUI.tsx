import { useState } from 'react';
import { submitClue } from '../Request';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

interface Props {
  gameId: string;
  playerName: string;
  isPlayerTurn: boolean;
  clueSubmitted: boolean;
}

const ClueUI = ({ gameId, playerName, isPlayerTurn, clueSubmitted }: Props) => {
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
      {isPlayerTurn && (
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
            disabled={clueInput.length === 0}
            variant='contained'
          >
            Submit
          </Button>
        </Stack>
      )}
      {!isPlayerTurn && !clueSubmitted && (
        <Typography>Please wait for your turn...</Typography>
      )}
      {!isPlayerTurn && clueSubmitted && (
        <Typography>You have submitted your clue!</Typography>
      )}
    </Box>
  );
};

export default ClueUI;
