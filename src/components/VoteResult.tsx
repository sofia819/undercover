interface Props {
  votes: string[];
}

const VoteResult = ({ votes }: Props) => {
  return (
    <>
      <h3>Votes Received Per Round</h3>
      {votes.map((vote, index) => (
        <div>
          Round {index + 1}: {vote}
        </div>
      ))}
    </>
  );
};

export default VoteResult;
