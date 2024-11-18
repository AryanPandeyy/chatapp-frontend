const getCookie = (name: string) => {
  const cookies = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return cookies ? cookies.split("=")[1] : null;
};

export const isUser = () => {
  const token = getCookie("username");
  if (token !== null) {
    return token;
  }
};
