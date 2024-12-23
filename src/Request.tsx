import axios from 'axios';
import useWebSocket from 'react-use-websocket';
import { GameState } from './types';

const apiUrl = import.meta.env.VITE_API_URL;

export const createGame = (playerName: string) => {
  return axios.post(`${apiUrl}/create`, { playerName });
};

export const joinGame = (gameId: string, playerName: string) => {
  return axios.post(`${apiUrl}/join`, { gameId, playerName });
};

export const startGame = (gameId: string) => {
  return axios.post(`${apiUrl}/start`, { gameId });
};
export const restartGame = (gameId: string) => {
  return axios.post(`${apiUrl}/restart`, { gameId });
};

export const getWord = (gameId: string, playerName: string) => {
  return axios.get(`${apiUrl}/${gameId}/${playerName}/word`);
};

export const connectWebsocket = () => {
  return useWebSocket<GameState>(`${apiUrl}/connect`, { share: true });
};

export const submitClue = (
  gameId: string,
  playerName: string,
  clue: string
) => {
  axios
    .post(`${apiUrl}/clue`, {
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
    .post(`${apiUrl}/vote`, {
      gameId,
      playerName,
      vote,
    })
    .catch((err) => console.error(err));
};
