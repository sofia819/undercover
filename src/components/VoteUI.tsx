import axios from 'axios';
import { useState } from 'react';

interface Props {
  gameId: string;
  playerName: string;
  playerList: string[];
}

const VoteUI = ({ gameId, playerName, playerList }: Props) => {
  const [clueInput, setClueInput] = useState('');
  const handleInput = (inputText: string) => setClueInput(inputText);

  const handleClick = () => {
    axios
      .post(`http://[::1]:5000/${gameId}/${playerName}/vote/${clueInput}`)
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

export default VoteUI;
