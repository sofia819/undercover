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

export enum MessageType {
  CONNECTED = 'CONNECTED',
}

export interface Clue {
  [playerName: string]: string;
}

export interface Vote {
  [playerName: string]: string;
}

export enum ErrorType {
  INVALID_GAME_ID = 'INVALID_GAME_ID',
  PLAYER_EXISTS = 'PLAYER_EXISTS',
}

export interface ErrorMessage {
  type: ErrorType;
}

export enum GameStatus {
  NONE,
  WAITING,
  CLUE,
  VOTE,
  COMPLETE,
}
