import axios from 'axios';
import { useState } from 'react';

interface Prpos {
  gameId: string;
  playerId: string;
}

const ClueUI = ({ gameId, playerName }: Props) => {
  const [clueInput, setClueInput] = useState('');
  const handleInput = (inputText: string) => setClueInput(inputText);

  const handleClick = () => {
    axios
      .post(`http://[::1]:5000/${gameId}/${playerName}/clue/${clueInput}`)
      .catch((err) => console.error(err));

    setClueInput('');
  };

  return (
    <>
      <div>
        <input
          defaultValue={clueInput}
          onChange={(e) => handleInput(e.target.value)}
        ></input>
        <button onClick={handleClick}>Submit</button>
      </div>
    </>
  );
};

export default ClueUI;
