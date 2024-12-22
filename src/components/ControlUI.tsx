import { useEffect } from 'react';
import VoteUI from './VoteUI';
import ClueUI from './ClueUI';
import Stack from '@mui/material/Stack';
import { getWord } from '../Request';
import { Status } from '../types';

const ControlUI = ({
  gameId,
  player: { playerName, isActive },
  setWord,
  word,
  currentRoundIndex,
  clues,
  votes,
  gameStatus,
  playerOrder,
}: any) => {
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
      {isActive ? (
        <Stack direction='column' spacing={1}>
          <ClueUI
            gameId={gameId}
            playerName={playerName}
            isPlayerTurn={gameStatus === Status.CLUE && order === current}
          />
          {gameStatus === Status.VOTE &&
            !votes[currentRoundIndex]?.[playerName] && (
              <VoteUI
                gameId={gameId}
                playerName={playerName}
                playerOrder={playerOrder}
              />
            )}
        </Stack>
      ) : (
        'ELIMINATED'
      )}
    </>
  );
};

export default ControlUI;
