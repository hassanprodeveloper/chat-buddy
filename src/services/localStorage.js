const storageId = "chatbuddy_";

export const set = (e) => {
  const { key, data } = e;
  const jsonData = JSON.stringify(data);
  if (e) {
    localStorage.setItem(`${storageId}${key}`, jsonData);
  }
  return true;
};
export const get = (e) => {
  const { key, data } = e;
  const jsonData = localStorage.getItem(`${storageId}${key}`);
  console.log("local storage get", JSON.parse(jsonData));
  return JSON.parse(jsonData);
};
export const remove = (e) => {
  const { key, data } = e;
  localStorage.removeItem(`${storageId}${key}`);
  return;
};
