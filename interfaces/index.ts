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
