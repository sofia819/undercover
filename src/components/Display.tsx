import { GameState, Status } from '../types';
import InfoCard from './InfoCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';

interface Props {
  gameState: GameState | undefined;
}

const Display = ({ gameState }: Props) => {
  if (!gameState) {
    return <></>;
  }

  const { players, playerOrder, clues } = gameState;

  return (
    <Container>
      {(gameState.gameStatus === Status.CLUE ||
        gameState.gameStatus === Status.VOTE) && (
        <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
          {playerOrder.map((player) => {
            return (
              <InfoCard
                player={players[player]}
                clues={clues.map((clue) => clue[player]) || []}
              />
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default Display;
