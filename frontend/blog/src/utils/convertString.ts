export const convertId = (userid: string) => {
  const splitUserId = userid?.split("@") as string[];
  return splitUserId[splitUserId?.length - 1] as string;
};

export const convertPublicId = (public_id : string) => {
  const splitPublicId = public_id.split('/')
  return splitPublicId[7].concat('/').concat(splitPublicId[8].split('.')[0])
}