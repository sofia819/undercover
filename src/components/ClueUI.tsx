import { useState } from 'react';
import { submitClue } from '../Request';
import Button from '@mui/material/Button';

interface Props {
  gameId: string;
  playerName: string;
}

const ClueUI = ({ gameId, playerName }: Props) => {
  const [clueInput, setClueInput] = useState('');
  const handleInput = (inputText: string) => setClueInput(inputText);

  const handleClick = () => {
    submitClue(gameId, playerName, clueInput);
    setClueInput('');
  };

  return (
    <>
      <div>
        <input
          value={clueInput}
          onChange={(e) => handleInput(e.target.value)}
          placeholder='Clue'
        ></input>
        <Button onClick={handleClick} disabled={clueInput.length === 0}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default ClueUI;
