import { Player, Role } from '../types';

interface Props {
  players: Player[];
}

const GameResult = ({ players }: Props) => {
  return (
    <>
      {players.filter((player) => player.isActive && player.role === Role.SPY)
        .length > 0 ? (
        <h3>Spies won</h3>
      ) : (
        <h3>Civilians won</h3>
      )}
    </>
  );
};

export default GameResult;
