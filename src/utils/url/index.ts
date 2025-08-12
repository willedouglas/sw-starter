export const getResourceId = (url: string): string => {
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 2];
};

export const getResourceType = (url: string): string => {
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 3];
};
