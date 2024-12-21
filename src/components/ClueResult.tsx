interface Props {
  clues: string[];
}

const ClueResult = ({ clues }: Props) => {
  return (
    <>
      <h3>Clues By Round</h3>
      {clues.map((clue, index) => (
        <div>
          Round {index + 1}: {clue}
        </div>
      ))}
    </>
  );
};

export default ClueResult;
