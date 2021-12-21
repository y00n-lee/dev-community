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

export const getUserInfo = async (id) => ({
  status: true,
  data: {
    user: {
      _id: "61bff86a27daf3450116db21",
      email: "sukho1007@naver.com",
      nickname: "지석호",
      birth: "2021-10-06T15:00:00.000Z",
      gender: "male",
      tags: ["js", "react", "vue", "mongoDB"],
      posts: [
        { title: "react프로젝트 하실 분 구합니다!", id: 10 },
        { title: "CS 공부할 사람 모여라~", id: 2 },
      ],
      emailVerified: false,
      keyForVerify: "e0d393a393ffdabc6767fFQtFD/+AiiB6crhqDPm",
      passwordReset: false,
      createdAt: "2021-12-20T03:28:42.351Z",
      updatedAt: "2021-12-20T04:46:44.333Z",
      __v: 0,
    },
    same: true,
  },
});

export const inSignout = () => ({
  status: true,
});
