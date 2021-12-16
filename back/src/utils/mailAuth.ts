import nodemailer from "nodemailer";
import dotenv from "dotenv";
import crypto from "crypto";

import smtpTransporter from "nodemailer-smtp-transport";

dotenv.config();

const smtpTransport = nodemailer.createTransport(
  smtpTransporter({
    service: "Gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  }),
);

export const mailAuthentication = (host: string, email: string, key: string) => {
  const url = `${host}/auth/confirmEmail?key=${key}`;

  const message = {
    to: email,
    subject: "[개발자 커뮤니티] 이메일 인증",
    html:
      "<h2>이메일 인증을 위해 URL을 클릭해주세요.</h2><br><br>" +
      `<a href="${url}">이메일 인증 확인</a>`,
  };

  return new Promise((resolve, reject) => {
    smtpTransport.sendMail(message, (err, info) => {
      if (err) return reject(err);
      resolve(info);
      smtpTransport.close();
    });
  });
};

export const makeVerifyKey = () => {
  const key_one = crypto.randomBytes(256).toString("hex").substr(100, 5);
  const key_two = crypto.randomBytes(256).toString("base64").substr(50, 5);
  return key_one + key_two;
};
