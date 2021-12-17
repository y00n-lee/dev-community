import nodemailer from "nodemailer";
import dotenv from "dotenv";
import crypto from "crypto";

import smtpTransporter from "nodemailer-smtp-transport";

dotenv.config();

interface IProps {
  to: string;
  subject: string;
  html: string;
}

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

const transportSendMail = (message: IProps) =>
  new Promise((resolve, reject) => {
    smtpTransport.sendMail(message, (err, info) => {
      if (err) return reject(err);
      resolve(info);
      smtpTransport.close();
    });
  });

export const emailAuthentication = (host: string, email: string, key: string) => {
  const url = `${host}/auth/confirmEmail?key=${key}`;

  const message = {
    from: "뮤티",
    to: email,
    subject: "[개발자 커뮤니티] 이메일 인증",
    html:
      "<h2>이메일 인증을 위해 URL을 클릭해주세요.</h2><br><br>" +
      `<a href="${url}">이메일 인증 확인</a>`,
  };

  return transportSendMail(message);
};
export const sendChangedPassword = (email: string, password: string) => {
  const message = {
    from: "뮤티",
    to: email,
    subject: "[개발자 커뮤니티] 임시 비밀번호가 발급되었습니다.",
    html:
      "<h2>발급된 비밀번호를 통해 재로그인해주세요.</h2><br><br>" +
      `<p>변경된 비밀번호는 ${password} 입니다.</p>`,
  };

  return transportSendMail(message);
};

export const makeVerifyKey = (n: number) => {
  const key_one = crypto.randomBytes(256).toString("hex").substr(100, n);
  const key_two = crypto.randomBytes(256).toString("base64").substr(50, n);
  return key_one + key_two;
};
