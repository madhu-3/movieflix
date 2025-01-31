export const isEmailValid = (email) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};
export const isNameValid = (name) => {
  return name.length < 3;
};
