export const onSignup = (data) => ({
  status: true,
});

export const onSignIn = (data) => ({
  status: true,
  data: {
    user: {
      _id: "61bff86a27daf3450116db21",
      email: "sukho1007@naver.com",
      nickname: "지석호",
      birth: "2021-10-06T15:00:00.000Z",
      gender: "male",
      tags: [],
      posts: [],
      emailVerified: false,
      passwordReset: false,
      createdAt: "2021-12-20T03:28:42.351Z",
      updatedAt: "2021-12-20T04:46:44.333Z",
      __v: 0,
    },
  },
});

export const getUserInfo = (id) => ({
  status: true,
  data: {
    user: {
      _id: "61bff86a27daf3450116db21",
      email: "sukho1007@naver.com",
      nickname: "지석호",
      birth: "2021-10-06T15:00:00.000Z",
      gender: "male",
      tags: [],
      posts: [],
      emailVerified: false,
      keyForVerify: "e0d393a393ffdabc6767fFQtFD/+AiiB6crhqDPm",
      passwordReset: false,
      createdAt: "2021-12-20T03:28:42.351Z",
      updatedAt: "2021-12-20T04:46:44.333Z",
      __v: 0,
    },
  },
});

export const inSignout = () => ({
  status: true,
});
