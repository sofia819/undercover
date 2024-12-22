import { useEffect } from 'react';
import VoteUI from './VoteUI';
import ClueUI from './ClueUI';
import Stack from '@mui/material/Stack';
import { getWord } from '../Request';
import { Status, Player, GameState } from '../types';

interface Props {
  gameState: GameState;
  setWord: Function;
  word: string;
  player: Player;
}

const ControlUI = ({
  setWord,
  word,
  player: { playerName, isActive },
  gameState: {
    gameId,
    currentRoundIndex,
    clues,
    votes,
    gameStatus,
    playerOrder,
    players,
  },
}: Props) => {
  useEffect(() => {
    if (playerName === '') {
      return;
    }

    getWord(gameId, playerName)
      .then(({ data }) => setWord(data))
      .catch((err) => console.error(err));
  }, [playerName]);

  const order: number = playerOrder
    .filter((playerName) => players[playerName].isActive)
    .indexOf(playerName);
  const current: number = Object.keys(clues[currentRoundIndex] || {}).length;

  return (
    <>
      {isActive ? (
        <Stack direction='column' spacing={1}>
          {gameStatus === Status.CLUE && order >= current && (
            <ClueUI
              gameId={gameId}
              playerName={playerName}
              isPlayerTurn={order === current}
            />
          )}
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
