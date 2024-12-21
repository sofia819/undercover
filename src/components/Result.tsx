import { Player } from '../types';
import ClueResult from './ClueResult';

import VoteResult from './VoteResult';

interface Props {
  player: Player;
  clues: string[];
  votes: string[];
}

const Result = ({ player, clues, votes }: Props) => (
  <>
    <h1>{player.playerName}</h1>
    <ClueResult clues={clues} />
    <VoteResult votes={votes} />
  </>
);

export default Result;
