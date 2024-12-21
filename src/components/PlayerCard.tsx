import { useEffect } from 'react';
import ClueUI from './ClueUI';
import VoteUI from './VoteUI';
import { getWord } from '../Request';

interface Props {
  gameId: string;
  playerName: string;
  setWord: Function;
  word: string;
}

const PlayerCard = ({ gameId, playerName, setWord, word }: Props) => {
  useEffect(() => {
    if (playerName === '') {
      return;
    }

    getWord(gameId, playerName)
      .then(({ data }) => setWord(data))
      .catch((err) => console.error(err));
  }, [playerName]);

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
