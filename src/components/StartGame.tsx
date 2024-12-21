import axios from 'axios';

interface Props {
  setGameState: Function;
  gameId: string;
}

const StartGame = ({ gameId, setGameState }: Props) => {
  const handleStart = () => {
    axios
      .post(`http://[::1]:5000/${gameId}/start`)
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div>
        <button onClick={handleStart}>Start Game</button>
      </div>
    </>
  );
};

export default StartGame;
