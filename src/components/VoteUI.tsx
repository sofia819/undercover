import { submitVote } from '../Request';

interface Props {
  gameId: string;
  playerName: string;
  players: string[];
}

const VoteUI = ({ gameId, playerName, players }: Props) => {
  const handleClick = (player: string) => {
    submitVote(gameId, playerName, player);
  };

  return (
    <>
      <div>
        {players.map(
          (player) =>
            player !== playerName && (
              <button key={player} onClick={() => handleClick(player)}>
                {player}
              </button>
            )
        )}
      </div>
    </>
  );
};

export default VoteUI;
