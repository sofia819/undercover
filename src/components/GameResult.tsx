import { Status } from '../types';

interface Props {
  gameStatus: Status;
}

const GameResult = ({ gameStatus }: Props) => {
  return (
    <>
      {gameStatus === Status.SPY_WON && <h3>Spies won</h3>}
      {gameStatus === Status.CIVILIAN_WON && <h3>Civilians won</h3>}
    </>
  );
};

export default GameResult;
