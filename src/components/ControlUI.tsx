import { useEffect } from 'react';
import VoteUI from './VoteUI';
import ClueUI from './ClueUI';
import Stack from '@mui/material/Stack';
import { getWord } from '../Request';
import { Status, Player, GameState } from '../types';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

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
    if (gameStatus !== Status.CLUE || currentRoundIndex > 0) {
      return;
    }

    getWord(gameId, playerName)
      .then(({ data }) => setWord(data))
      .catch((err) => console.error(err));
  }, [gameStatus]);

  const activePlayers = playerOrder.filter(
    (playerName) => players[playerName].isActive
  );
  const order: number = activePlayers.indexOf(playerName);
  const current: number = Object.keys(clues[currentRoundIndex] || {}).length;

  return (
    <>
      <Stack direction='column' spacing={1}>
        {isActive ? (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Typography>Word: {word}</Typography>
            </Box>
            {gameStatus === Status.CLUE && (
              <ClueUI
                gameId={gameId}
                playerName={playerName}
                isPlayerTurn={order === current}
                clueSubmitted={order < current}
              />
            )}
            {gameStatus === Status.VOTE && (
              <VoteUI
                gameId={gameId}
                playerName={playerName}
                playerOrder={activePlayers}
                voteSubmitted={playerName in votes[currentRoundIndex]}
              />
            )}
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography>ELIMINATED</Typography>
          </Box>
        )}
      </Stack>
    </>
  );
};

export default ControlUI;
