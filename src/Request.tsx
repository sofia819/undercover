import axios from 'axios';
import useWebSocket from 'react-use-websocket';
import { GameState } from './types';

export const createGame = (playerName: string) => {
  return axios.post(`http://[::1]:5000/create`, { playerName });
};

export const joinGame = (gameId: string, playerName: string) => {
  return axios.post(`http://[::1]:5000/join`, { gameId, playerName });
};

export const startGame = (gameId: string) => {
  return axios.post(`http://[::1]:5000/start`, { gameId });
};
export const restartGame = (gameId: string) => {
  return axios.post(`http://[::1]:5000/restart`, { gameId });
};

export const getWord = (gameId: string, playerName: string) => {
  return axios.get(`http://[::1]:5000/${gameId}/${playerName}/word`);
};

export const connectWebsocket = () => {
  return useWebSocket<GameState>(`http://[::1]:5000/`, { share: true });
};

export const submitClue = (
  gameId: string,
  playerName: string,
  clue: string
) => {
  axios
    .post(`http://[::1]:5000/clue`, {
      gameId,
      playerName,
      clue,
    })
    .catch((err) => console.error(err));
};

export const submitVote = (
  gameId: string,
  playerName: string,
  vote: string
) => {
  axios
    .post(`http://[::1]:5000/vote`, {
      gameId,
      playerName,
      vote,
    })
    .catch((err) => console.error(err));
};
