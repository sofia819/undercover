export interface GameState {
  gameId: string;
  gameStatus: Status;
  currentRoundIndex: number;
  maxRoundIndex: number;
  players: { [playerName: string]: Player };
  playerOrder: string[];
  clues: Clue[];
  votes: Vote[];
  winner?: Role;
}

export interface Player {
  playerName: string;
  role: Role;
  isActive: boolean;
}

export enum Status {
  WAITING = 'WAITING',
  CLUE = 'CLUE',
  VOTE = 'VOTE',
  COMPLETE = 'COMPLETE',
}

export enum Role {
  CIVILIAN = 'CIVILIAN',
  SPY = 'SPY',
}

export interface Clue {
  [playerName: string]: string;
}

export interface Vote {
  [votedPlayerName: string]: number;
}
