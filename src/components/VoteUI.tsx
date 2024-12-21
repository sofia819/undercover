import { useState } from 'react';
import { submitVote } from '../Request';

interface Props {
  gameId: string;
  playerName: string;
  playerList: string[];
}

const VoteUI = ({ gameId, playerName, playerList }: Props) => {
  const [voteInput, setVoteInput] = useState('');
  const handleInput = (inputText: string) => setVoteInput(inputText);

  const handleClick = () => {
    submitVote(gameId, playerName, voteInput);
    setVoteInput('');
  };

  return (
    <>
      <div>
        <input
          value={voteInput}
          onChange={(e) => handleInput(e.target.value)}
        ></input>
        <button onClick={handleClick}>Submit</button>
      </div>
    </>
  );
};

export default VoteUI;
