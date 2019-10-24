export const initialData = async (url, storeCallback) => {
  const response = await fetch(url);
  const initialData = (await response.json()).data;

  if (!initialData) return;

  storeCallback(initialData);
};
