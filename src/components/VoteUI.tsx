import { submitVote } from '../Request';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

interface Props {
  gameId: string;
  playerName: string;
  playerOrder: string[];
  voteSubmitted: boolean;
}

const VoteUI = ({ gameId, playerName, playerOrder, voteSubmitted }: Props) => {
  const [vote, setVote] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setVote(event.target.value as string);
  };

  const handleClick = () => {
    submitVote(gameId, playerName, vote);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {voteSubmitted ? (
        <Typography>You have submitted your vote!</Typography>
      ) : (
        <Stack
          direction='row'
          spacing={1}
          sx={{
            width: '30%',
          }}
        >
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Player Vote</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={vote}
              label='Player'
              onChange={handleChange}
            >
              {playerOrder.map(
                (player) =>
                  player !== playerName && (
                    <MenuItem key={player} value={player}>
                      {player}
                    </MenuItem>
                  )
              )}
            </Select>
          </FormControl>
          <Button
            onClick={handleClick}
            disabled={vote.length === 0}
            variant='contained'
          >
            Submit
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default VoteUI;
