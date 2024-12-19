import { useLocalStorage } from "usehooks-ts";

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useLocalStorage(
    "memory-game-accesstoken",
    ""
  );

  return { accessToken, setAccessToken };
};
