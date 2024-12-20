export interface ProfileI {
  success: boolean;
  data: {
    id: string;
    username: string;
  };
}

export interface LogInDataI {
  username: string;
  password: string;
}

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  userId: string;
}

export interface StartGameResult {
  gameId: string;
  player: string;
}

export interface CardState {
  id: string;
  url: string;
  userId: string | null;
  isOpen: boolean;
  isMatched: boolean;
}

export interface GameState {
  id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  maxPlayers: number;
  isDisabled: boolean;
  currRound: string | null;
  cards: CardState[];
}

export interface GameStateResult {
  state: GameState;
  message: string;
}
