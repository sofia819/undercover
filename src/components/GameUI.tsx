import { GameState, Role, Status } from '../types';
import StartGame from './StartGame';
import GameInfo from './GameInfo';
import Stack from '@mui/material/Stack';
import RestartGame from './RestartGame';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

interface Props {
  gameId: string;
  playerName: string;
  gameState: GameState;
}

const GameUI = ({ gameId, playerName, gameState }: Props) => {
  return (
    <Stack
      direction='column'
      spacing={1}
      sx={{
        alignSelf: 'center',
        width: '50%',
      }}
    >
      <GameInfo gameId={gameId} playerName={playerName} gameState={gameState} />
      {gameState && gameState.gameStatus === Status.WAITING && (
        <StartGame
          gameId={gameId}
          hasEnoughPlayers={Object.keys(gameState.players || {}).length >= 3}
        />
      )}
      {(gameState.gameStatus === Status.CIVILIAN_WON ||
        gameState.gameStatus === Status.SPY_WON) && (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography>
              The spy was
              {Object.values(gameState.players || {})
                .filter((player) => player.role === Role.SPY)
                .map((player) => ` ${player.playerName}`)}
            </Typography>
          </Box>
          <RestartGame
            gameId={gameId}
            hasEnoughPlayers={Object.keys(gameState.players).length >= 3}
          />
        </>
      )}
    </Stack>
  );
};

export default GameUI;
