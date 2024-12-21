import { useEffect } from 'react';
import ClueUI from './ClueUI';
import VoteUI from './VoteUI';
import { getWord } from '../Request';
import { Clue, Vote, Status, Player } from '../types';

interface Props {
  gameId: string;
  player: Player;
  setWord: Function;
  word: string;
  playerOrder: string[];
  currentRoundIndex: number;
  clues: Clue[];
  votes: Vote[];
  gameStatus: Status;
}

const PlayerCard = ({
  gameId,
  player: { playerName, isActive },
  setWord,
  word,
  currentRoundIndex,
  playerOrder,
  clues,
  votes,
  gameStatus,
}: Props) => {
  useEffect(() => {
    if (playerName === '') {
      return;
    }

    getWord(gameId, playerName)
      .then(({ data }) => setWord(data))
      .catch((err) => console.error(err));
  }, [playerName]);

  const order: number = playerOrder.indexOf(playerName);
  const current: number = Object.keys(clues[currentRoundIndex] || {}).length;

  return (
    <>
      {currentRoundIndex >= 0 &&
        gameId !== '' &&
        playerName !== '' &&
        (isActive ? (
          <>
            <h4>Word: {word}</h4>
            <h5>Clue</h5>
            {gameStatus === Status.CLUE && order === current && (
              <ClueUI gameId={gameId} playerName={playerName} />
            )}
            <h5>Vote</h5>
            {gameStatus === Status.VOTE &&
              !votes[currentRoundIndex]?.[playerName] && (
                <VoteUI
                  gameId={gameId}
                  playerName={playerName}
                  playerList={[]}
                />
              )}
          </>
        ) : (
          <h5>Eliminated</h5>
        ))}
    </>
  );
};

export default PlayerCard;
