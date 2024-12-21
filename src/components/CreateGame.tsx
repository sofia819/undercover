import axios from 'axios';

interface Props {
  setGameId: Function;
  gameId: string;
}

const CreateGame = ({ setGameId, gameId }: Props) => {
  const createGame = () => {
    axios
      .post(`http://[::1]:5000/create`)
      .then(({ data }) => setGameId(data))
      .catch((err) => console.error(err));
  };

  return (
    <>{gameId === '' && <button onClick={createGame}>Create Game</button>}</>
  );
};

export default CreateGame;
