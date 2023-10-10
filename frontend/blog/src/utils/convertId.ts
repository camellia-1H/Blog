export const convertId = (userid: string) => {
  const splitUserId = userid?.split("@") as string[];
  return splitUserId[splitUserId?.length - 1] as string;
};
