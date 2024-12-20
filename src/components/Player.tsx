interface Player {
  playerName: string;
  clues: string[];
}

const Player = (props: Player) => (
  <>
    {props.playerName}
    {props.clues.map((clue) => (
      <div>{clue}</div>
    ))}
  </>
);

export default Player;
