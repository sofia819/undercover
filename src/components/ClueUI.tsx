import { useState } from 'react';
import { submitClue } from '../Request';

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
        ></input>
        <button onClick={handleClick}>Submit</button>
      </div>
    </>
  );
};

export default ClueUI;
