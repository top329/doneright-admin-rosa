import { AES } from "crypto-js";

export const validateToken = (expireDate: number) => {
  return expireDate > Date.now() / 1000;
};

export const cryptoEncryptPwd = (password: string) => {
  const phrase = new Date().getTime().toString();
  return { pwd: AES.encrypt(password, phrase).toString(), phrase };
};
