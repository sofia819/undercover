import { useEffect } from 'react';
import axios from 'axios';
import ClueUI from './ClueUI';
import VoteUI from './VoteUI';

interface Props {
  gameId: string;
  playerName: string;
  setWord: Function;
  word: string;
}

const PlayerCard = ({ gameId, playerName, setWord, word }: Props) => {
  useEffect(() => {
    axios
      .get(`http://[::1]:5000/${gameId}/${playerName}/word`)
      .then(({ data }) => setWord(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {gameId !== '' && playerName !== '' && (
        <>
          <h3>GameId: {gameId}</h3>
          <h4>Player: {playerName}</h4>
          <h4>Word: {word}</h4>
          <ClueUI gameId={gameId} playerName={playerName} />
          <VoteUI gameId={gameId} playerName={playerName} playerList={[]} />
        </>
      )}
    </>
  );
};

export default PlayerCard;
