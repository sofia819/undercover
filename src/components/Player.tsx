import { Player } from '../types';
interface PlayerProp {
  player: Player;
  clues: string[];
  votes: number[];
}

const Player = ({ player, clues, votes }: PlayerProp) => (
  <>
    <h1>{player.playerName}</h1>
    <h3>Clues By Round</h3>
    {clues.map((clue) => (
      <div>{clue}</div>
    ))}
    <h3>Votes Received Per Round</h3>
    {votes.map((vote) => (
      <div>{vote}</div>
    ))}
  </>
);

export default Player;
